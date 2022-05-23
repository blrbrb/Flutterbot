/*

 Copyright (C) 2022 programmerpony

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

const emojis = require('../emojis.js');

module.exports = {
  meta: {
    name: 'Italiano',
    new_lang_message: 'Parlerò in italiano.'
  },
  author: 'Autore',
  message: 'Messaggio',
  channel: 'Canale',
  user_commands: 'Comandi:',
  admin_commands: 'Comandi Admin:',
  // DO NOT TRANSLATE COMMAND NAMES
  commands: [
    {
      name: 'avatar',
      description: `Invia il avatar dell'utente menzionato.`,
      options: [
        {
          name: 'utente',
          type: 'USER',
          description: `L'utente di cui vuoi inviare l'avatar`
        }
      ]
    },
    {
      name: 'userinfo',
      description: `Mostra informazioni account dell'utente menzionato.`,
      options: [
        {
          name: 'utente',
          type: 'USER',
          description: `L'utente di cui vuoi mostrare l'informazione.`
        }
      ]
    },
    {
      name: 'roleinfo',
      description: 'Mostra informazioni sul ruolo.',
      options: [
        {
          name: 'ruolo',
          type: 'ROLE',
          description: `Il ruolo di cui vuoi mostrare l'informazione.`,
          required: true
        }
      ]
    },
    {
      name: 'serverinfo',
      description: 'Mostra informazioni sul server.'
    },
    {
      name: 'rank',
      description: 'Mostra il tuo XP e livello nel tabellone.',
      options: [
        {
          name: 'user',
          type: 'USER',
          description: `Il grado dell'utente da visualizzare.`
        }
      ]
    },
    {
      name: 'leaderboard',
      description: 'Mostra gli utenti con più XP.'
    },
    {
      name: 'profilo',
      description: 'Modifica il tuo profilo (in ogni server).',
      options: [
        {
          name: 'colore',
          type: 'STRING',
          description: 'Il profilo hex per il tuo profilo.'
        },
        {
          name: 'immagine_di_sfondo',
          type: 'STRING',
          description: `URL per l'immagine di sfondo.`
        }
      ]
    },
    {
      name: 'emoji',
      description: `Invia l'emoji come un'immagine.`,
      options: [
        {
          name: 'emoji',
          type: 'STRING',
          description: `L'emoji di cui vuoi cambiare in un'immagine.`,
          required: true
        }
      ]
    },
    {
      name: 'love',
      description: 'Verifica la compatibilità tra due utenti.',
      options: [
        {
          name: 'amante1',
          type: 'USER',
          description: 'Primo membro della coppia.',
          required: true
        },
        {
          name: 'amante2',
          type: 'USER',
          description: 'Secondo membro della coppia.',
          required: true
        }
      ]
    },
    {
      name: 'boop',
      description: `Boop un'utente.`,
      options: [
        {
          name: 'utente',
          type: 'USER',
          description: `L'utente di cui vuoi fare un boop.`,
          required: true
        }
      ]
    },
    {
      name: 'hug',
      description: `Abbraccia un'utente.`,
      options: [
        {
          name: 'utente',
          type: 'USER',
          description: `L'utente di cui vuoi abbracciare.`,
          required: true
        }
      ]
    },
    {
      name: 'kiss',
      description: `Bacia un'utente.`,
      options: [
        {
          name: 'utente',
          type: 'USER',
          description: `L'utente che vuoi baciare`,
          required: true
        }
      ]
    },
    {
      name: 'booru',
      description: `Invia un'immagine SFW da Manebooru.`,
      options: [
        {
          name: 'tags',
          type: 'STRING',
          description: 'Parola chiave da ricercare (separare con virgole).'
        }
      ]
    },
    {
      name: 'clop',
      description: `Invia un'immagine NSFW da Manebooru.`,
      options: [
        {
          name: 'tags',
          type: 'STRING',
          description: 'Parola chiave da ricercare (separare con virgole).'
        }
      ]
    },
    {
      name: 'e621',
      description: 'Sends an image from e621.',
      options: [
        {
          name: 'tags',
          type: 'STRING',
          description: 'Tags to search (separated by spaces).'
        }
      ]
    },
    {
      name: 'torrent',
      description: 'Torrent pony!'
    },
    {
      name: 'say',
      description: 'Chrysalis dice quello che scrivi.',
      options: [
        {
          name: 'testo',
          type: 'STRING',
          description: 'Il testo vuoi Chyrsalis dire.',
          required: true
        }
      ]
    }
  ],
  help: {
    // DO NOT TRANSLATE COMMAND NAMES
    user: {
      avatar: ['avatar {utente}', `Invia il avatar dell'utente menzionato. Puoi usare l'ID dell'utente.`],
      userinfo: ['userinfo {utente}', `Mostra informazioni account dell'utente menzionato. Puoi usare l'ID dell'utente.`],
      roleinfo: ['roleinfo {ruolo}', `Mostra informazioni sul ruolo. Puoi digitare il nome dell'ruolo per cercarlo.`],
      serverinfo: ['serverinfo','Mostra informazioni sul server.'],
      rank: ['grado {utente (opzionale)}','Mostra il tuo livello attuale e il tuo XP.'],
      leaderboard: ['tabellone.','Mostra il tabellone di XP.'],
      profile: ['profile {campo} {valore nuovo}','Modifica il tuo profilo (en ogni server).'],
      emoji: ['jumbo {emoji}', `Invia l'emoji come un'immagine.`],
      love: ['love {utente 1} {utente 2 (opzionale)}', 'Verifica la compatibilità tra due utenti.'],
      boop: ['boop {utente}', `Boop un'utente.`],
      hug: ['hug {utente}', `Abbraccia un'utente.`],
      kiss: ['bacia {utente}', `Bacia un'utente.`],
      booru: ['booru {ricerca (opzionale)}', `Invia un'immagine SFW da Manebooru. Puoi usare termini di ricerca.`],
      clop: ['clop {ricerca (opzionale)}', `Invia un'immagine NSFW da Manebooru. Puoi usare termini di ricerca. Solo può essere usato in un canale NSFW.`,'NSFW'],
      e621: ['e621 {ricerca (opzionale)}', `Invia un'immagine da e621. Puoi usare termini di ricerca. Solo può essere usato in un canale NSFW.`,'NSFW'],
      torrent: ['torrent', 'Torrent pony!'],
      say: ['say {testo}', 'Chrysalis dice quello che scrivi.']
    },
    admin: [
      ['setprefix {prefisso}', 'Imposta il prefisso del server.'],
      ['setlang {lingua}', 'Imposta la lingua del bot in questo server.'],
      ['setcolor {hex}', 'Imposta il colore (hexcode) del bot.'],
      ['addword {parola}', 'Blocca una parola in questo server.'],
      ['delword {parola}', 'Sblocca una parola in questo server.'],
      ['addwords {parole}','Blocca una frase in questo server.'],
      ['delwords {parole}', 'Sblocca una frase in questo server.'],
      ['listwords', 'Mosta le parole bloccato in questo server.'],
      ['clean {numero di messaggi}', 'Elimina i messaggi in blocco. Messaggi più vecchie di due semane non può essere eliminato.'],
      ['enable {modulo}', 'Abilita un modulo.'],
      ['disable {modulo}', 'Disabilita un modulo.'],
      ['config {modulo}', 'Modifica un modulo.'],
      ['reset {modulo}', 'Ripristina un modulo.'],
      ['rolemenu {ruoloID} {ruoloID} {ruoloID}...', `Crea un rolemenu. Ogni argomenti è un'ID di un ruolo.`],
      ['welcome {utene}', `Mostra un'anteprima della carta di benvenuto per l'utente menzionato.`],
      ['boost {utene}', `Mostra un'anteprima della carta di potenziare il server.`], // Better translation needed
      ['setxp {utente} {xp}', `Imposta la quantità di xp che un'utente ha.`],
      ['importxp', `Importa l'XP d'altri bot di livello.`]
    ]
  },
  defaultValues: {
    boost: {
      message: '**{user} ha appena potenziato il server!**',
      title: 'Grazie mille per aver poteniziato il server!',
      description: `${emojis.boost} Goditi il tuo nuovo ruolo! ${emojis.boost}`
    },
    welcome: {
      message: 'Benvenuto a **{guild}**! {user}'
    },
    goodbye: {
      message: 'Arrivederci, **{user}**. Spero ci vediamo presto.',
      banMessage: '**{user}** è stato bannato dal server.'
    }
  },
  wrong_channel: 'Il comando che hai inviato non può essere usato in questo canale',
  blocked_words: 'Parole bloccato',
  list: 'Lista',
  word_s_blocked: 'Parola(e) bloccato',
  word_s_unblocked: 'Parola(e) sbloccato',
  word_s: 'Parola(e)',
  word_s_blocked_by: 'Bloccato da',
  word_s_unblocked_by: 'Sbloccato da',
  message_deleted: 'Messaggio eliminato',
  message_deleted_dm: 'Il tuo messaggio era eliminato perché contiene parole non consentito in questo server. Stai attento a quello che dici!',
  you_must_send_an_emoji: `Si deve inviare un'emoji`,
  couldn_t_find_that_emoji: `Non può trovare l'emoji inviato.`,
  type_one_or_two_users: 'Digitare un o due utenti.',
  self_love: 'So che è importante amare se stessi, ma non essere un narcisista!',
  lovemeter_messages: ['Triste.','Incompatibile.','Molto Basso... Solo siete amici.','Probabile amici.','Non è probabile ma non impossibile.','Potrebbe!','È probabile. Voi potete provare.','Molto compatibile! Potreste essere molto carini','Baciate definitivamente.','Potreste essere una relazione meravigliosa','Potreste stare insieme per sempre'],
  nsfw_only: 'Questo comando solo può essere usato in un canale NSFW.',
  requested_by: 'Richiesto di',
  how_to_delete: 'Clicca qui se questa immagine è inappropriate.',
  please_report: 'Segnala questa immagine in modo che non appaia più.',
  role_info: 'Info del ruolo:',
  name: 'Nome',
  color: 'Colore',
  member_count: 'Conte membro',
  date_created: 'Data di creazione',
  couldn_t_find_that_user: `Impossibile trovare l'utente .`,
  user_info: `Informazioni dell'utente:`,
  user_id: `ID dell'utente`,
  server_join_date: 'Data di iscrizione al server',
  account_creation_date: `Data di creazione dell'account`,
  roles: 'Ruoli',
  avatar: 'Avatar da {0}',
  no_new_words_added: 'Nessune parole erano aggiunti.',
  no_words_were_removed: 'Nessune parole erano eliminato.',
  bulk_delete_two_weeks: 'Messaggi più vecchie di due semane non può essere eliminato.',
  bulk_delete_missing_permissions: 'Non ho i permissi necessari per ne elimnare in questo canale.',
  bulk_delete_max_100: 'Solo puoi elimnare meno che 100 messaggi.',
  no_images_found: 'Impossibile trovare immagini corrispondenti a quella ricerca.',
  jump_to_moment: 'Passa al momento',
  the_current_prefix_is: 'Il prefisso attuale è **{0}**',
  the_current_prefix_for_this_server_is: 'Il prefisso attuale per questo server è',
  change_prefix_to: 'Cambia el prefisso con **{0}**?',
  prefix_was_changed_to: 'Prefisso stato cambiato con **{0}**',
  valid_modules: 'Moduli validi',
  available_languages: 'Lingue disponibili',
  boop_title: '{0} ha fatto un boop su {1}!',
  boop_self: '{0} ha fatto un boop su se stesso',
  boop_chrysalis: '{0} provava fare un boop a Chrysalis',
  hug_title: '{0} ha abbracciato {1}',
  hug_self: '{0} ha abbracciato se stesso',
  hug_chrysalis: '{0} ha provato abbracciare Chrysalis.',
  kiss_title: '{0} ha baciato {1}',
  kiss_self: '{0} si bacia',
  kiss_chrysalis: '{0} provava baciare Chrysalis',
  server_info: 'Informazioni del server:',
  server_id: 'ID del server',
  server_owner: 'Proprietario del server',
  channels: 'Canali',
  server_boosts: 'Potenziamenti',
  image_source: `Fonte dell'immagine`,
  please_specify_a_new_value: 'Specifica un valore nuovo.',
  value_must_be_true_or_false: 'Il valore deve essere **true** o **false**.', // Do NOT translate **true** and **false**
  module_updated: 'Il modulo è aggiornato!',
  attachments: 'Allegati',
  message_id: 'ID del messaggio',
  module_enabled: 'Modulo {0} sta abilitato!',
  module_disabled: 'Modulo {0} sta disabilitato!',
  current_color: 'Colore attuale',
  change_color_to: 'Cambia il colore in {0}?',
  invalid_color: 'Colore non valido',
  color_was_changed_to: 'Il colore sta cambiato in {0}',
  usage: 'Utilizzo',
  role_menu: 'Menu ruolo ',
  select_the_roles_that_you_want: 'Seleziona i ruoli che desideri',
  you_can_only_add_up_to_25_roles_to_the_menu: 'Solo puoi aggiungere 25 ruoli al menu.',
  manage_roles_permission_required: `Chrysalis ha bisogno dell'autorizzazione \`MANAGE_ROLES\` per far funzionare i menu dei ruoli.`,
  chrysalis_role_too_low: `Il ruolo de Chrysalis ha meno permessi che il ruolo richiesto. Per favore chiedi a un'Admin per menderlo.`,
  roles_managed_by_integrations_cannot_be_manually_assigned: 'I ruoli gestiti dalle integrazioni non possono essere assegnati manualmente.',
  download_emoji: `Scarica l'emoji`,
  please_type_a_valid_channel: 'Per favore digita un canale valido.',
  invalid_channel: 'Almeno un canale è invalido.',
  invite_the_bot: 'Invita il bot',
  website: 'Sito Web',
  support_server: 'Server di supporto',
  source_code: 'Codice sorgente',
  support_the_project: 'Sostenere il progetto',
  unkown_role: 'Impossibile trovare il ruolo.',
  role_id: 'ID del ruolo',
  welcome: 'Benvenuto!',
  you_are_the_member_n: 'Sei membro Nº{0}',
  filter_not_found: 'Impossibile trovare il filtro, controlla se il filtro è pubblico.',
  help_time_out: 'Il tempo per spostarsi tra le pagine è finito.',
  old_message: 'Messagio vecchio',
  new_message: 'Messagio nuovo',
  old_attachments: 'Allegati vecchi',
  new_attachments: 'Allegati nuovi',
  message_edited: 'Messagio modificato',
  season: 'Stagione',
  seasons: 'Stagione',
  movies: 'Film',
  torrent_footer: 'Chrysalis consiglia di utilizzare qBitTorrent in quanto è privo di pubblicità e open source. I link sono forniti da yayponies.no /)',
  error_fetching_episodes: `C'era un errore durante il recupero dei link. Per favore riprova più tardi.`,
  attach_files_permission_missing: 'Chrysalis non ha permissi da inviare gli immagini in questo cannale.',
  please_type_a_valid_positive_integer: 'Por favore, invia un numero intero positivo.',
  module_property_not_found: 'Proprietà del modulo non trovata.',
  levelup: '**Sei salito di livello!**\nOra sei di livello **{level}**!',
  leaderboard_title: 'Classifica',
  level: 'Livello',
  rank: 'Rango',
  total_xp: 'XP Totale',
  profile_fields_title: 'Puoi modificare queste impostazioni:',
  profile_updated: 'Profilo Aggiornato!',
  unsupported_image_type: 'Tipo di immagine non supportato.',
  check_documentation: 'Fare clic sul nome del modulo per aprire la documentazione per questo modulo.',
  import_levels_from: 'Da quale bot vuoi importare i livelli?',
  no_levels_found: 'Nessun livello trovato da {bot} in questo server.',
  mee6_fix: 'Assicurati la tua classifica MEE6 è pubblico cliccando [questa opzione](https://mee6.xyz/dashboard/921413532141101077/leaderboard).',
  xp_migration_adapt: 'Il modo in cui viene calcolato XP potrebbe essere diverso da quello di altri bot. Cosa vuoi fare?',
  import_levels_and_adapt_xp: 'Importa i livelli e adatta XP',
  import_xp_and_adapt_levels: 'Importa il XP e adatta i livelli',
  import_leaderboard: 'La classifica ora apparirà così:',
  migration_complete: 'Migrazione completata!',
  xp_successfully_imported: `L'XP è stato importato correttamente.`
}
