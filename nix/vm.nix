{ ... }:
{
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;
  users.users.test = {
    isNormalUser = true;
    extraGroups = [ "wheel" ]; # Enable ‘sudo’ for the user.
    initialPassword = "test";
  };

  services.greetd.enable = true;
  programs.regreet.enable = true;

  programs.shade.enable = true;

  system.stateVersion = "25.05";
}
