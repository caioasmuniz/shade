{
  description = "Shade - Skill's Hyprland Adwaita Desktop Environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    astal.url = "github:aylur/astal";
    hyprland.url = "github:hyprwm/Hyprland";
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
        astal.packages.${system}.hyprland
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
        bash
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

      nixosModules.default = import ./nix/module.nix inputs;

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
        modules = [
          ./nix/vm.nix
          self.nixosModules.default
        ];
      };
    };
}
