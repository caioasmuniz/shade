{
  config,
  lib,
  pkgs,
  ...
}:
let
  cfg = config.programs.shade;
in
{
  imports = [
    ./binds.nix
  ];

  options.programs.shade.hyprland = {
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

  config = lib.mkIf cfg.enable (
    lib.mkMerge [
      {
        services.power-profiles-daemon.enable = true;

        programs.uwsm = {
          enable = true;
          waylandCompositors.hyprland = {
            prettyName = "Hyprland";
            comment = "Hyprland compositor managed by UWSM";
            binPath = "/run/current-system/sw/bin/Hyprland";
          };
        };

        programs.hyprland = {
          enable = true;
          withUWSM = true;
          package = pkgs.hyprland;
          portalPackage = pkgs.xdg-desktop-portal-hyprland;

          plugins = [
            pkgs.hyprlandPlugins.hypr-dynamic-cursors
          ];

          settings = {
            monitor = [
              ", preferred, auto-left, auto"
            ];

            workspace = [
              "special:scratchpad, on-created-empty: [pseudo; size 1920 1080] ghostty"
            ];

            bind = [
              "SUPERSHIFT,Return,exec,${pkgs.lib.getExe pkgs.ghostty}"
            ];
            input = {
              kb_layout = "br,us";
              follow_mouse = 1;
              accel_profile = "flat";
              touchpad = {
                natural_scroll = true;
                scroll_factor = 0.5;
              };
            };

            general = {
              gaps_in = 2;
              gaps_out = 4;
              float_gaps = 4;
              border_size = 2;
              "col.active_border" = "0xffa6e3a1";
              "col.inactive_border" = "0xFF313244";
              resize_on_border = true;
              hover_icon_on_border = true;
              snap = {
                enabled = true;
                respect_gaps = true;
              };
            };

            group = {
              "col.border_active" = "0xff1e1e2e";
              "col.border_inactive" = "0xffcba6f7";
            };

            gesture = [
              "3, vertical, workspace"
              "3, swipe, mod: SUPER, move"
              "3, swipe, mod: SUPERCONTROL, resize"
              "4, vertical, special, scratchpad"
            ];

            decoration = {
              rounding = 12;
              blur = {
                enabled = true;
                passes = 2;
                special = true;
                popups = true;
              };
              shadow = {
                enabled = true;
                range = 4;
                render_power = 4;
              };
            };

            animations = {
              enabled = true;
              workspace_wraparound = true;
            };

            animation = [
              "windows,1,5,default,slide"
              "layers,1,5,default,slide"
              "border,1,10,default"
              "fadePopups,1,5,default"
              "workspaces,1,5,default,slidevert"
              "monitorAdded,1,5,default"
            ];

            binds = {
              hide_special_on_workspace_change = true;
            };

            misc = {
              animate_manual_resizes = true;
              animate_mouse_windowdragging = false;
              vfr = true;
              vrr = 1;
              enable_swallow = true;
              swallow_regex = "ghostty";
              layers_hog_keyboard_focus = true;
              focus_on_activate = true;
              disable_splash_rendering = true;
              disable_hyprland_logo = true;
            };

            xwayland = {
              force_zero_scaling = true;
              create_abstract_socket = true;
            };

            dwindle = {
              pseudotile = 1;
              preserve_split = true;
            };

            plugin = {
              dynamic-cursors = {
                enabled = true;
                mode = "none";
                shake = {
                  enabled = true;
                  threshold = 3.0;
                  timeout = 1000;
                  limit = 4.0;
                  speed = 0.0;
                };
                hyprcursor = {
                  enabled = true;
                  nearest = false;
                  fallback = "default";
                };
              };
            };

            layerrule = [
              "noanim,selection"
            ];

            exec = [
              "hyprctl setcursor Adwaita 24"
            ];
          };
        };
      }
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
