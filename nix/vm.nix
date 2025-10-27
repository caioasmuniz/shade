{
  pkgs,
  self,
  ...
}:
{
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;
  users.users.caio = {
    isNormalUser = true;
    extraGroups = [ "wheel" ]; # Enable ‘sudo’ for the user.
    initialPassword = "caio";
  };

  services.greetd = {
    enable = true;
    settings = {
      intial_session = {
        command = pkgs.lib.getExe pkgs.hyprland;
      };
      default_session = {
        command = "${pkgs.greetd}/bin/agreety --cmd Hyprland";
      };
    };
  };

  programs.hyprland.enable = true;

  system.stateVersion = "25.05";
  home-manager = {
    useGlobalPkgs = true;
    useUserPackages = true;
    extraSpecialArgs = { inherit self; };
    users.caio = {
      imports = [
        self.homeManagerModules.default
        ./hyprland.nix
        {
          programs.home-manager.enable = true;
          programs.stash = {
            enable = true;
            systemd.enable = true;
            hyprland = {
              binds.enable = true;
              blur.enable = true;
            };
          };
          services.darkman.enable = true;
        }
      ];
      home = {
        username = "caio";
        homeDirectory = "/home/caio";
        stateVersion = "25.05";
      };
    };
  };
}
