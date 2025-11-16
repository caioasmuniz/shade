{ pkgs, lib, ... }:
{
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;
  users.users.test = {
    isNormalUser = true;
    extraGroups = [ "wheel" ];
    initialPassword = "test";
  };

  programs.regreet.enable = true;
  services.greetd = {
    enable = true;
    settings = {
      initial_session = {
        command = "${lib.getExe pkgs.uwsm} start hyprland-uwsm.desktop";
        user = "test";
      };
    };
  };

  environment.systemPackages = [
    pkgs.firefox
    pkgs.moonlight-qt
    pkgs.ghostty
  ];

  programs.shade.enable = true;
  programs.shade.shell.systemd.enable = false;
  programs.shade.hyprland.settings = {
    bind = [
      "SUPERSHIFT,Return,exec,${lib.getExe pkgs.uwsm} app -- ghostty"
      "SUPERSHIFT,B,exec,${lib.getExe pkgs.uwsm} app -- firefox"
    ];
    exec-once = [ "uwsm-app -t service -- shade-shell"];
  };

  system.stateVersion = "25.05";
}
