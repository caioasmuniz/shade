self:
{
  config,
  lib,
  pkgs,
  ...
}:
let
  cfg = config.programs.shade;
  pkg = self.packages.${pkgs.system}.default;
in
{
  options.programs.shade = {
    shell = {
      enable = lib.mkEnableOption "Enable shade shell";
      blur.enable = lib.mkOption {
        type = lib.types.bool;
        default = false;
        example = true;
        description = ''
          Enable layer rules to blur the widget's background in hyprland.
        '';
      };
      systemd.enable = lib.mkOption {
        type = lib.types.bool;
        default = false;
        example = true;
        description = ''
          Enable systemd integration.
        '';
      };
    };
    hyprland = {
      binds.enable = lib.mkOption {
        type = lib.types.bool;
        default = false;
        example = true;
        description = ''
          Enable default binds to toggle the widgets in hyprland.
        '';
      };
    };
  };
  config = lib.mkIf cfg.shell.enable (
    lib.mkMerge [
      { home.packages = [ pkg ]; }
      (lib.mkIf cfg.shell.systemd.enable {
        systemd.user.services.shade-shell = {
          Unit = {
            Description = "shade Desktop Shell";
            PartOf = [
              "graphical-session.target"
              "tray.target"
            ];
            After = [ "graphical-session-pre.target" ];
          };

          Service = {
            ExecStart = "${lib.getExe pkg}";
            Restart = "on-failure";
            KillMode = "mixed";
          };

          Install = {
            WantedBy = [
              "graphical-session.target"
              "tray.target"
            ];
          };
        };
      })
      (lib.mkIf cfg.hyprland.binds.enable {
        wayland.windowManager.hyprland.extraConfig = ''
          bind=SUPER,Space,exec, shade-shell toggle applauncher
          bind=SUPER,n,exec, shade-shell toggle quicksettings
          bind=SUPER,w,exec, shade-shell toggle bar

          gesture= 3,right, dispatcher,exec, shade-shell toggle applauncher
          gesture= 3,left, dispatcher,exec, shade-shell toggle quicksettings
        '';
      })
      (lib.mkIf cfg.shell.blur.enable {
        wayland.windowManager.hyprland.extraConfig = ''
          layerrule=blur,gtk4-layer-shell
          layerrule=ignorezero,gtk4-layer-shell
        '';
      })
    ]
  );
}
