{ pkgs, lib, ... }:
{
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;
  users.users.test = {
    isNormalUser = true;
    extraGroups = [ "wheel" ]; # Enable ‘sudo’ for the user.
    initialPassword = "test";
  };

  programs.regreet.enable = true;
  services.greetd = {
    enable = true;
    settings = {
      initial_session = {
        command = "${pkgs.uwsm}/bin/uwsm start hyprland-uwsm.desktop";
        user = "test";
      };
    };
  };

  programs.shade.enable = true;
  programs.shade.hyprland.settings = {
    bind = [
      "SUPERSHIFT,Return,exec,${lib.getExe pkgs.ghostty}"
    ];
  };

  system.stateVersion = "25.05";
}
