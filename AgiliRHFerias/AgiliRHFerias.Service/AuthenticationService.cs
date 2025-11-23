using AgiliRHFerias.Contracts;
using AgiliRHFerias.Entities.Exceptions;
using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Entities.Models.Configuration;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.Authentication;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly JwtConfiguration _jwtConfiguration;

        private User? _user;

        public AuthenticationService(ILoggerManager logger, IMapper mapper, UserManager<User> userManager, IConfiguration configuration)
        {
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _configuration = configuration;
            _jwtConfiguration = new JwtConfiguration();
            _configuration.Bind(_jwtConfiguration.Section, _jwtConfiguration);
        }

        public async Task<IdentityResult> RegisterUser(UserForRegistrationDto userForRegistration)
        {
            var user = _mapper.Map<User>(userForRegistration);
            var result = await _userManager.CreateAsync(user, userForRegistration.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRolesAsync(user, userForRegistration.Roles);
            }

            return result;
        }

        public async Task<bool> ValidateUser(UserForAuthenticationDto userForAuth)
        {
            _user = await _userManager.FindByNameAsync(userForAuth.UserName);

            var result = (_user != null && await _userManager.CheckPasswordAsync(_user, userForAuth.Password));

            if (!result)
            {
                _logger.LogWarn($"{nameof(ValidateUser)}: Authentication failed. Wrong user name or password.");
            }
            return result;
        }

        public async Task<TokenDto> CreateToken(bool populateExp)
        {
            var signingCredentials = GetSigningCredentials(_jwtConfiguration.SecretKey);
            var claims = await GetClaims();

            var tokenOptions = GenerateTokenOptions(signingCredentials, claims);

            var refreshToken = GenerateRefreshToken();
            _user.RefreshToken = refreshToken;

            if (populateExp)
            {
                _user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
            }

            await _userManager.UpdateAsync(_user);

            var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            var user = new UserDto
            {
                Id = _user.Id,
                UserName = _user.UserName,
                FirstName = _user.FirstName,
                LastName = _user.LastName,
                Email = _user.Email,
                PhoneNumber = _user.PhoneNumber,
            };

            return new TokenDto(user, accessToken, refreshToken);
        }

        private SigningCredentials GetSigningCredentials(string secretKey)
        {
            var key = Encoding.UTF8.GetBytes(secretKey);
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, _user.Id),
                new Claim(ClaimTypes.Name, _user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(_user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var tokenOptions = new JwtSecurityToken
            (
                issuer: _jwtConfiguration.ValidIssuer,
                audience: _jwtConfiguration.ValidAudience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_jwtConfiguration.Expires)),
                signingCredentials: signingCredentials
            );

            return tokenOptions;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public async Task<TokenDto> RefreshToken(RefreshTokenDto tokenDto)
        {
            var principal = GetPrincipalFromExpiredToken(tokenDto.AccessToken);

            var user = await _userManager.FindByNameAsync(principal.Identity.Name);

            if (user == null || user.RefreshToken != tokenDto.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                throw new RefreshTokenBadRequest();
            }

            _user = user;

            return await CreateToken(populateExp: false);
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfiguration.SecretKey)),
                ValidateLifetime = true,
                ValidIssuer = _jwtConfiguration.ValidIssuer,
                ValidAudience = _jwtConfiguration.ValidAudience
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            SecurityToken securityToken;

            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);

            var jwtSecurityToken = securityToken as JwtSecurityToken;

            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }
    }
}
