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
      pnpm
      pnpmConfigHook
    ];

    pnpmDeps = pkgs.fetchPnpmDeps {
      inherit pname version src;
      fetcherVersion = 4;
      hash = "sha256-uzZJPiowUuavsEyCyBjmeCSh2q6HGL4OnofNZm0LzyQ=";
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
