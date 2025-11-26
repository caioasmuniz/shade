{
  pkgs,
  buildInputs,
  nativeBuildInputs,
  wrapperPackages,
  ...
}:
{
  default = pkgs.mkShell {
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
        d-spy
      ]);
  };
}
