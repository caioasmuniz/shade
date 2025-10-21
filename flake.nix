{
  description = "Stash - Skill's terrific astal shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    astal.url = "github:aylur/astal";
  };

  outputs =
    {
      self,
      nixpkgs,
      astal,
    }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};

      astalPackages = with astal.packages.${system}; [
        apps
        battery
        bluetooth
        hyprland
        mpris
        network
        notifd
        powerprofiles
        tray
        wireplumber
        astal4
      ];

      nativeBuildInputs = with pkgs; [
        wrapGAppsHook
        gobject-introspection
        meson
        pkg-config
        ninja
        desktop-file-utils
        libxml2
      ];

      buildInputs =
        with pkgs;
        [
          gsettings-desktop-schemas
          glib
          libadwaita
          libgtop
          gtk4
          gtk4-layer-shell
          gjs
          esbuild
          nodejs
        ]
        ++ astalPackages;

      wrapperPackages = with pkgs; [
        brightnessctl
        darkman
      ];
    in
    {
      packages.${system} = {
        default = import ./nix/stash.nix {
          inherit
            pkgs
            buildInputs
            nativeBuildInputs
            wrapperPackages
            ;
        };
      };

      homeManagerModules = {
        hyprland = import ./nix/hyprland.nix;
        stash = import ./nix/hm-module.nix self;
        default = self.homeManagerModules.stash;
      };

      devShells.${system} = import ./nix/devshell.nix {
        inherit
          pkgs
          buildInputs
          nativeBuildInputs
          wrapperPackages
          ;
      };
      default = self.devShells.stash;
    };
}
