{ pkgs, lib, ... }:
let
  uwsm-app = app : "${pkgs.uwsm}/bin/uwsm-app -t service --${app}.desktop";
in
{
  programs.hyprland.settings = {
    bind = [
      "SUPER,Return,exec,${uwsm-app "com.mitchellh.ghostty"}"
      "SUPERSHIFT,B,exec,${uwsm-app "firefox"}"
      "SUPER,V,exec,pkill pwvucontrol || pwvucontrol"
      "SUPER,E,exec,${uwsm-app "org.gnome.Nautilus"}"
      "SUPERSHIFT,v,exec,pkill wvkbd || ${lib.getExe pkgs.wvkbd}"

      "SUPER, PRINT, exec, ${lib.getExe pkgs.hyprshot} -m window"
      ", PRINT, exec, ${lib.getExe pkgs.hyprshot} -m output"
      "SUPERSHIFT, PRINT, exec, ${lib.getExe pkgs.hyprshot} -m region"

      "SUPERSHIFT,R,exec, hyprctl reload;${pkgs.libnotify}/bin/notify-send 'Hyprland had just reloaded!'"
      "SUPERSHIFT,Q,exec,pkill Hyprland"

      "SUPERSHIFT,F,togglefloating,active"
      "SUPERSHIFT,G,togglegroup"
      "SUPER,G,changegroupactive,f"
      "SUPER,Q,killactive"
      "SUPER,P,exec, hyprctl dispatch pseudo"
      "SUPERSHIFT,P,exec, hyprctl --batch 'dispatch togglefloating 1;dispatch resizeactive exact 1920 1080;dispatch togglefloating 0;dispatch pseudo'"
      "SUPER,F,fullscreen"
      ",Pause,togglespecialworkspace, scratchpad"
      ",Insert,togglespecialworkspace,scratchpad"
      "SUPER,Insert,movetoworkspace,special:scratchpad"
      "SUPER,Pause,movetoworkspace,special:scratchpad"
      "SUPER,S,togglesplit"

      ",XF86AudioMedia,exec,${pkgs.playerctl}/bin/playerctl play-pause"
      ",XF86AudioPlay,exec,${pkgs.playerctl}/bin/playerctl play-pause"
      ",XF86AudioStop,exec,${pkgs.playerctl}/bin/playerctl stop"
      ",XF86AudioPrev,exec,${pkgs.playerctl}/bin/playerctl previous"
      ",XF86AudioNext,exec,${pkgs.playerctl}/bin/playerctl next"

      "SUPER,left,movefocus,l"
      "SUPER,right,movefocus,r"
      "SUPER,up,movefocus,u"
      "SUPER,down,movefocus,d"
      "SUPERSHIFT,left,movewindow,l"
      "SUPERSHIFT,right,movewindow,r"
      "SUPERSHIFT,up,movewindow,u"
      "SUPERSHIFT,down,movewindow,d"
      "SUPERALT,up,workspace,-1"
      "SUPERALT,down,workspace,+1"
      "SUPERSHIFTALT,left,movewindow,mon:-1"
      "SUPERSHIFTALT,right,movewindow,mon:+1"
      "SUPERSHIFTALT,up,movetoworkspace,-1"
      "SUPERSHIFTALT,down,movetoworkspace,+1"

      "SUPER,j,movefocus,l"
      "SUPER,l,movefocus,r"
      "SUPER,i,movefocus,u"
      "SUPER,k,movefocus,d"
      "SUPERSHIFT,j,movewindow,l"
      "SUPERSHIFT,l,movewindow,r"
      "SUPERSHIFT,i,movewindow,u"
      "SUPERSHIFT,k,movewindow,d"
      "SUPERALT,i,workspace,-1"
      "SUPERALT,k,workspace,+1"
      "SUPERSHIFTALT,i,movetoworkspace,-1"
      "SUPERSHIFTALT,k,movetoworkspace,+1"
      ", XF86AudioMute, exec, wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"
      ",XF86AudioMicMute, exec, wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle"
    ];

    bindle = [
      ", XF86AudioRaiseVolume, exec, wpctl set-volume -l '1.0' @DEFAULT_AUDIO_SINK@ 5%+"
      ", XF86AudioLowerVolume, exec, wpctl set-volume -l '1.0' @DEFAULT_AUDIO_SINK@ 5%-"
      "SHIFT, XF86AudioRaiseVolume, exec, swayosd-client --input-volume raise 5"
      "SHIFT, XF86AudioLowerVolume, exec, swayosd-client --input-volume lower 5"
    ];

    bindm = [
      "SUPER,mouse:272,movewindow"
      "SUPER,SHIFT, movewindow"
      "SUPER,mouse:273,resizewindow"
      "SUPER,CONTROL,resizewindow"
    ];

    binde = [
      "SUPERCONTROL,left,resizeactive,-64 0"
      "SUPERCONTROL,right,resizeactive,64 0"
      "SUPERCONTROL,up,resizeactive,0 -64"
      "SUPERCONTROL,down,resizeactive,0 64"
      "SUPERCONTROL,j,resizeactive,-64 0"
      "SUPERCONTROL,l,resizeactive,64 0"
      "SUPERCONTROL,i,resizeactive,0 -64"
      "SUPERCONTROL,k,resizeactive,0 64"
      ",XF86MonBrightnessUp, exec, brightnessctl set +5%"
      ",XF86MonBrightnessDown, exec, brightnessctl set -5%"
    ];
  };
}
