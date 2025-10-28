{
  description = "Shade - Skill's Hyprland Adwaita Desktop Environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    astal.url = "github:aylur/astal";
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

  };

  outputs =
    {
      self,
      nixpkgs,
      astal,
      ...
    }@inputs:
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
          libgweather
          glib-networking
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
        default = import ./nix/desktop-shell.nix {
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
        shade = import ./nix/hm-module.nix self;
        default = self.homeManagerModules.shade;
      };

      devShells.${system} = import ./nix/devshell.nix {
        inherit
          pkgs
          buildInputs
          nativeBuildInputs
          wrapperPackages
          ;
      };
      nixosConfigurations.vm = nixpkgs.lib.nixosSystem {
        inherit system;
        specialArgs = {
          inherit self;
        };
        modules = [
          ./nix/vm.nix
          inputs.home-manager.nixosModules.home-manager
        ];
      };
    };
}
