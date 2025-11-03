{ pkgs, ... }:
{
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;
  users.users.test = {
    isNormalUser = true;
    extraGroups = [ "wheel" ]; # Enable ‘sudo’ for the user.
    initialPassword = "test";
  };

  services.greetd = {
    enable = true;
    settings = {
      intial_session = {
        command = pkgs.lib.getExe pkgs.hyprland;
      };
      default_session = {
        command = "${pkgs.greetd}/bin/agreety --cmd Hyprland";
      };
    };
  };

  programs.shade.enable = true;

  system.stateVersion = "25.05";
}
