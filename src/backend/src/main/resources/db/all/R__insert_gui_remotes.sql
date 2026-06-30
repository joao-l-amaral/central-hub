DELETE FROM gui_remote;

INSERT INTO gui_remote (name, url, title, enable) values
 (
  'gameQ',
  'http://localhost:4202/remoteEntry.json',
  'GameQ',
  true
 ),
 (
  'shelveProducts',
  'http://localhost:4201/remoteEntry.json',
  'ShelveProducts',
  true
 );