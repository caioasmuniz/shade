inputs:
{
  config,
  lib,
  pkgs,
  ...
}:
let
  cfg = config.programs.shade;
  pkg = inputs.self.packages.${pkgs.system}.default;
in
{
  imports = [
    inputs.hyprland.nixosModules.default
    ./hyprland
  ];

  options.programs.shade = {
    enable = lib.mkEnableOption "Enables the shade desktop environment";
    shell = {
      enable = lib.mkOption {
        type = lib.types.bool;
        default = true;
        description = "Enable shade shell";
      };
      blur.enable = lib.mkOption {
        type = lib.types.bool;
        default = true;
        description = ''
          Enable layer rules to blur the widget's background in hyprland.
        '';
      };
      systemd.enable = lib.mkOption {
        type = lib.types.bool;
        default = true;
        description = ''
          Enable systemd integration.
        '';
      };
    };
  };
  config = lib.mkIf cfg.enable (
    lib.mkMerge [
      (lib.mkIf cfg.shell.enable {
        environment.systemPackages = [
          pkg
          pkgs.adwaita-icon-theme
        ];
      })
      (lib.mkIf cfg.shell.systemd.enable {
        systemd.user.services.shade-shell = {
          enable = true;
          description = "shade Desktop Shell";

          after = [ "graphical-session-pre.target" ];

          wantedBy = [
            "graphical-session.target"
            "tray.target"
          ];

          partOf = [
            "graphical-session.target"
            "tray.target"
          ];

          serviceConfig = {
            Type = "dbus";
            ExecStart = "${lib.getExe pkg}";
            BusName = "com.caioasmuniz.shade_shell";
            Restart = "on-failure";
            KillMode = "mixed";
          };
        };
      })
      (lib.mkIf cfg.shell.blur.enable {
        programs.hyprland.extraConfig = ''
          layerrule=blur,gtk4-layer-shell
          layerrule=ignorezero,gtk4-layer-shell
        '';
      })
    ]
  );
}
