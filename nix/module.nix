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
  hypr = import ./hyprland { inherit pkgs inputs; };
in
{
  imports = [ inputs.hyprland.nixosModules.default ];
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
    hyprland = {
      enable = lib.mkOption {
        type = lib.types.bool;
        default = true;
        description = "Enable hyprland compositor";
      };
      binds.enable = lib.mkOption {
        type = lib.types.bool;
        default = true;
        description = ''
          Enable default binds to toggle the widgets in hyprland.
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
          pkgs.darkman
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
            ExecStart = "${lib.getExe pkg}";
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

      (lib.mkIf cfg.hyprland.enable hypr)

      (lib.mkIf cfg.hyprland.binds.enable {
        programs.hyprland.extraConfig = ''
          bind=SUPER,Space,exec, shade-shell toggle applauncher
          bind=SUPER,n,exec, shade-shell toggle quicksettings
          bind=SUPER,w,exec, shade-shell toggle bar

          gesture= 3,right, dispatcher,exec, shade-shell toggle applauncher
          gesture= 3,left, dispatcher,exec, shade-shell toggle quicksettings
        '';
      })
    ]
  );
}
