{
  pkgs,
  buildInputs,
  nativeBuildInputs,
  wrapperPackages,
  ...
}:
let
  pname = "shade-shell";
  version = "0.0.0";
  src = ../.;
in
pkgs.stdenv.mkDerivation {
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
      hash = "sha256-rSU9HQEZ+jYD0u/mc+6k9v0Ogw9rRRR5o8icehw7WM8=";
    };

    installPhase = ''
      mkdir -p $out
      cp -r . $out
    '';
  };

  preFixup = ''
    gappsWrapperArgs+=(
      --prefix XDG_DATA_DIRS : "${pkgs.glycin-loaders}/share"
      --prefix PATH : ${pkgs.lib.makeBinPath wrapperPackages}
      --prefix LD_PRELOAD : 
      "${pkgs.gtk4-layer-shell}/lib/libgtk4-layer-shell.so"
      )'';

  meta.mainProgram = "${pname}";
}
