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
    };
  };
  config = lib.mkIf cfg.enable (
    lib.mkMerge [
      (lib.mkIf cfg.shell.enable {
        environment.systemPackages = [
          pkg
          pkgs.adwaita-icon-theme
        ];
        programs.hyprland.settings.exec = [ "uwsm-app -t service -- shade-shell" ];
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
