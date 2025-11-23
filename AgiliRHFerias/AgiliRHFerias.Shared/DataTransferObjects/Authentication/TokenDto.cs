namespace AgiliRHFerias.Shared.DataTransferObjects.Authentication
{
    public record TokenDto(UserDto user, string AccessToken, string RefreshToken);
}
