# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # pkgs.go
    # pkgs.python311
    # pkgs.python311Packages.pip
    pkgs.deno
    pkgs.nodejs_20
    pkgs.ncdu
    # pkgs.nodePackages.nodemon
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "dsznajder.es7-react-js-snippets"
      "msjsdiag.vscode-react-native"
      "ms-vscode.js-debug"
      "esbenp.prettier-vscode"
      "dbaeumer.vscode-eslint"
      "bradlc.vscode-tailwindcss"
      "denoland.vscode-deno"
      "eamodio.gitlens"
    ];

    # Enable previews
    previews = {
      enable = false;
      previews = {
        # web = {
        #   # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
        #   # and show it in IDX's web preview panel
        #   command = ["npm" "run" "dev"];
        #   manager = "web";
        #   env = {
        #     # Environment variables to set for your server
        #     PORT = "$PORT";
        #   };
        # };
        # android = {
        #   # noop
        #   command = ["tail" "-f" "/dev/null"];
        #   manager = "web";
        # };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        npm-install = "cd expo-mobile-app && npm ci --prefer-offline --no-audit --no-progress --timing && npm i @expo/ngrok@^4.1.0";
        eas-install = "npm install -g eas-cli";
      };
      # Runs when the workspace is (re)started
      # onStart = {
      #   connect-device = ''
      #     adb -s localhost:5554 wait-for-device
      #   '';
      #   android = ''
      #     cd expo-mobile-app && npm run android -- --port 5554 --tunnel
      #   '';
      # };
    };
  };
}
