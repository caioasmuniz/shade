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

      pname = "stash";
      version = "0.0.0";
      src = ./.;
    in
    {
      packages.${system}.default = pkgs.stdenv.mkDerivation {
        inherit
          pname
          version
          buildInputs
          nativeBuildInputs
          ;
        src = pkgs.stdenv.mkDerivation {
          inherit src pname version;
          nativeBuildInputs = with pkgs; [
            pnpm.configHook
            pnpm
          ];

          pnpmDeps = pkgs.pnpm.fetchDeps {
            inherit pname version src;
            fetcherVersion = 2;
            hash = "sha256-k48l50Q1U3NKxQikgRDvtdKZyRuzCJr8DCvIDu6ZxCM=";
          };

          installPhase = ''
            cp -r . $out
          '';
        };

        preFixup = ''
          gappsWrapperArgs+=(
            --prefix PATH : ${pkgs.lib.makeBinPath wrapperPackages}
            --prefix LD_PRELOAD : "${pkgs.gtk4-layer-shell}/lib/libgtk4-layer-shell.so"
          )'';

        meta.mainProgram = "${pname}";
      };

      homeManagerModules = {
        default = self.homeManagerModules.stash;
        stash = import ./hm-module.nix self;
      };

      devShells.${system}.default = pkgs.mkShell {
        LD_PRELOAD = "${pkgs.gtk4-layer-shell}/lib/libgtk4-layer-shell.so";
        packages =
          nativeBuildInputs
          ++ buildInputs
          ++ wrapperPackages
          ++ (with pkgs; [
            libnotify
            pnpm
            nixd
            nixfmt-rfc-style
            nix-output-monitor
          ]);

      };
    };
}
