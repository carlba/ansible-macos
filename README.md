# ansible-macos

- [Gettings Started With Ansible](https://docs.ansible.com/ansible/latest/getting_started/index.html)

## Usage

### Get the ID of a MAS application

1. Install the application through the MAS GUI
2. Run `mas list` and copy the id from there

### Remapping Keys

- The Karabiner Element complex modification must be manually activated in
  Harbinger Elements/Complex Modifications/Add Rule. After the playbook is executed there
  will be a rule called `Change caps_lock to command+space`.
- To ensure that the Karabiner Modification `Change caps_lock to command+space` actually switches
  input goto the macOS Keyboard Shortcuts dialog and set the switch input source to be toggled
  by `⇧⌥⌘Space`
