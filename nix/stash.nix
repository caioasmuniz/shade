{
  pkgs,
  buildInputs,
  nativeBuildInputs,
  wrapperPackages,
  ...
}:
let
  pname = "stash";
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
      hash = "sha256-22r0jXxiFhazfiqp4mki8cBB70D+xvLzJWYSHP7NZEs=";
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
}
