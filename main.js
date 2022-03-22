/*
Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

Milestone 4
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

Milestone 5
Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti
*/

const app = new Vue({
	el: '#app',
	data: {
		activeChatIndex: 0,
		activeMenuIndex: null,
		searchString: '',
		mainUser: {
			name: 'Henri',
			avatar: '_1',
		},
		arrChats: [
			{
				user: {
					name: 'Michele',
					avatar: '_1',
					visible: true,
				},
				newMessageContent: '',
				messages: [
					{
						date: '2020-01-10T15:30:55',
						content: 'Hai portato a spasso il cane?',
						sent: true,
					},
					{
						date: '2020-01-10T15:50:00',
						content: 'Ricordati di stendere i panni',
						sent: true,
					},
					{
						date: '2020-01-10T16:15:22',
						content: 'Tutto fatto!',
						sent: false,
					},
				],
			},
			{
				user: {
					name: 'Fabio',
					avatar: '_2',
					visible: true,
				},
				newMessageContent: '',
				messages: [
					{
						date: '2020-03-20T16:30:00',
						content: 'Ciao come stai?',
						sent: true,
					},
					{
						date: '2020-03-20T16:30:55',
						content: 'Bene grazie! Stasera ci vediamo?',
						sent: false,
					},
					{
						date: '2020-03-20T16:35:00',
						content: 'Mi piacerebbe ma devo andare a fare la spesa.',
						sent: true,
					},
				],
			},
			{
				user: {
					name: 'Samuele',
					avatar: '_3',
					visible: true,
				},
				newMessageContent: '',
				messages: [
					{
						date: '2020-03-28T10:10:40',
						content: 'La Marianna va in campagna',
						sent: false,
					},
					{
						date: '2020-03-28T10:20:10',
						content: 'Sicuro di non aver sbagliato chat?',
						sent: true,
					},
					{
						date: '2020-03-28T16:15:22',
						content: 'Ah scusa!',
						sent: false,
					},
				],
			},
			{
				user: {
					name: 'Alessandro B.',
					avatar: '_4',
					visible: true,
				},
				newMessageContent: '',
				messages: [
					{
						date: '2020-01-10T15:30:55',
						content: 'Lo sai che ha aperto una nuova pizzeria?',
						sent: true,
					},
					{
						date: '2020-01-10T15:50:00',
						content: 'Si, ma preferirei andare al cinema',
						sent: false,
					},
				],
			},
			{
				user: {
					name: 'Alessandro L.',
					avatar: '_5',
					visible: true,
				},
				newMessageContent: '',
				messages: [
					{
						date: '2020-01-10T15:30:55',
						content: 'Ricordati di chiamare la nonna',
						sent: true,
					},
					{
						date: '2020-01-10T15:50:00',
						content: 'Va bene, stasera la sento',
						sent: false,
					},
				],
			},
			{
				user: {
					name: 'Claudia',
					avatar: '_6',
					visible: true,
				},
				newMessageContent: '',
				messages: [
					{
						date: '2020-01-10T15:30:55',
						content: 'Ciao Claudia, hai novità?',
						sent: true,
					},
					{
						date: '2020-01-10T15:50:00',
						content: 'Non ancora',
						sent: false,
					},
					{
						date: '2020-01-10T15:51:00',
						content: 'Nessuna nuova, buona nuova',
						sent: true,
					},
				],
			},
		],
	},
	methods: {
		getAvatarSrc(avatar) {
			return 'img/avatar' + avatar + '.jpg';
		},
		setActiveChat(index) {
			this.activeChatIndex = index;
			this.resetMessageIndex();
			// this.activeChat = this.arrChats[index];
		},
		getFormattedDate(date, format) {
			let formatStr = 'dd/MM/yyyy HH:mm:ss';
			switch (format) {
				case 'italian':
					formatStr = 'dd/MM/yyyy HH:mm:ss'
					break;
				case 'american':
					formatStr = 'MM/dd/yyyy HH:mm:ss'
					break;
			}
			return luxon.DateTime.fromISO(date).toFormat(formatStr);
		},
		addNewMessage() {
			const activeChat = this.arrChats[this.activeChatIndex];
			const newMessage = {
				date: luxon.DateTime.now().toISO().split('.')[0],
				content: activeChat.newMessageContent,
				sent: true,
			};
			activeChat.messages.push(newMessage);
			activeChat.newMessageContent = '';
			this.getComputerReply(this.activeChatIndex);
		},
		getComputerReply(chatIndex) {
			setTimeout(() => {
				const newMessage = {
					date: luxon.DateTime.now().toISO().split('.')[0],
					content: 'OK',
					sent: false,
				};
				this.arrChats[chatIndex].messages.push(newMessage);
			}, 2000);
		},
		searchChat() {
			this.arrChats.forEach(chat => {
				if (chat.user.name.toLowerCase().includes(this.searchString.toLowerCase())) {
					chat.user.visible = true;
				} else {
					chat.user.visible = false;
				}
			});
		},
		toggleMenu(messageIndex, event) {
			// questo evento è stato assegnato sia alla freccia nei messaggi che al container dell'app
			// quando viene chiamato dal click sulla freccia messageIndex è un numero, quando chiamato dal container invece viene passato null
			//
			// controllare se è stata cliccata la freccia
			// se è stata cliccata la freccia allora controllare messageIndex
			// se message index non è null allora setta il menu attivo
			// altrimenti non fare niente
			// se non è stata cliccata la freccia ma un'area qualsiasi allora resetta l'index dei menu
			if (event.target.closest('.js-message-menu-toggler')) {
				if (messageIndex != null) {
					if (this.activeMenuIndex == messageIndex) {
						this.resetMessageIndex();
					} else {
						this.activeMenuIndex = messageIndex;
					}
				}
			} else {
				this.resetMessageIndex();
			}
		},
		deleteMessage(messageIndex) {
			this.arrChats[this.activeChatIndex].messages.splice(messageIndex, 1);

		},
		resetMessageIndex() {
			this.activeMenuIndex = null;
			console.log('logMessage');
		},
		log(logMessage) {
			console.log('logMessage');
		}
	}
});
