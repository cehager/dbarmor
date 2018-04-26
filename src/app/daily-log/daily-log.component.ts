import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-daily-log',
  templateUrl: './daily-log.component.html',
  styleUrls: ['./daily-log.component.scss']
})
export class DailyLogComponent implements OnInit {

  editorContent: string;


  constructor() { }


  options: Object = {
    key: 'WC7A5D4A4fG3A7A7C7A3B3C2G3C2F2ybeiB-11gdB-7A3c1jd==',
    charCounterCount: true,
    toolbarButtons: ['fontFamily', 'fontSize', 'color', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
        'superscript', 'align', 'outdent', 'indent', 'paragraphFormat',
       'insertHR', 'clearFormatting', 'undo', 'redo',  'emoticons', 'print', 'spellChecker',
        '|', 'alert', 'clear', 'save', 'archive', 'delete' ],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'strikeThrough',
        'fontSize', 'alert', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'strikeThrough',
        'fontSize', 'alert', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'strikeThrough',
        'fontSize', 'alert', 'paragraphFormat'],
    quickInsertButtons: ['image', 'table'],
    height: 328,
    fontSizeDefaultSelection: '14',
    placeholderText: 'PRIVATIZE yourself, start typing here...',
    saveInterval: 0,
    pastePlain: true,
    enter: $.FroalaEditor.ENTER_BR,
    codeBeautifierOptions: {
        end_with_newline: true,
        indent_inner_html: true,
        extra_liners: '["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "ol", "table", "dl"]',
        brace_style: 'expand',
        indent_char: ' ',
        indent_size: 4,
        wrap_line_length: 0
    }
};


  ngOnInit() {
  }

   doEncrypt() {
//     let rmsg = this.ed.froalaEditor(this.edContentGet);
//     console.log('editor content is: ', rmsg);
//     rmsg = rmsg.replace(/&nbsp;/gi, '');
//     rmsg = rmsg.trim();
//     if (rmsg.length === 0) {
//         return;
//     }

//     console.log('editor content is: ', rmsg);
//     // if (this.ed.froalaEditor('charCounter.count') < 1) {
//     //     this.editorContent = this.editorContent
//     //         + '<br><br>Message must be at least 20 characters in length. This will go away with automatic padding.';
//     //     return;
//     // }
//     this.appRepository.messageDto.to = this.emailTo;
//     this.appRepository.messageDto.from = this.appRepository.activeUserLoginName;  // this.emailFrom;
//     this.appRepository.messageDto.messageId = 'mid';
//     // this.appRepository.messageDto.createdOn = new Date().toDateString();
//     // this.appRepository.messageDto.deleteAfter = new Date().toDateString();
//     this.appRepository.messageDto.userId = this.appRepository.activeUserId;
//     this.appRepository.messageDto.fromUserId = this.appRepository.activeUserId;
//     console.log('email subject content is: ', this.emailSubject);
//     this.appRepository.messageDto.subject = this.emailSubject;

//     this.apiPath = 'https://4226-25056.el-alt.com/dex/hypertext/l1/do';
//     //this.apiPath = 'http://localhost:5445/dex/hypertext/l1/do';
//     this.appRepository.doEncrypt(rmsg, this.apiPath)
//         .subscribe((data: MessageDto) => {
//             this.editorContent = data.message; // updates secure editor
//             this.appRepository.isText = false;
//             this.appRepository.messageDto.messageId = data.messageId;
//            // this.ed.froalaEditor('edit.off');
//         }, () => { this.editorContent = 'Not authorized to encrypt text, please login first.';  this.appRepository.isText = true; });
//             // () => {
//             //     this.appRepository.doGet('http://localhost:5445/dex/hypertext/l1/getbymsgid/keep/'
//             // + this.appRepository.messageDto.messageId) // updates the email inbox list
//             //         .subscribe((data: MessageDto[] ) => {
//             //             this.appRepository.messages = data;
//             //             this.messages = this.appRepository.messages;
//             //             // console.log('content of messages is: ', this.messages);
//             //         }, (error) => { console.log('doGet failed', error); });
//             // });


 }

 doDecrypt() {
//     this.apiPath = 'https://4226-25056.el-alt.com/dex/hypertext/l1/getbymsgid/undo/';
//     //this.apiPath = 'http://localhost:5445/dex/hypertext/l1/getbymsgid/undo/';
//     console.log('row selected msgid is: ', this.emailMsgId);
//     // this.appRepository.doDecrypt(this.ed.froalaEditor(this.edContentGet), this.apiPath)
//     this.appRepository.doDecrypt(this.emailMsgId, this.apiPath)
//         .subscribe((data: MessageDto) => {
//             console.log('last row selected', this.lastRowSelected);
//             console.log('MessageDto back from server is: ', data);
//             this.editorContent = data.message; // updates the secure editor
//             this.emailUser = data.userId;
//             this.emailMsgId = data.messageId;
//             this.emailTo = data.to;
//             this.emailToUserId = data.toUserId;
//             this.emailSubject = data.subject;
//             this.emailFrom = data.from;
//             this.emailFromUserId = data.from;
//             this.emailFrom = data.fromUserId;

//             this.appRepository.isText = true;
//         }, () => { this.editorContent = 'No longer available, previously decrypted';  this.appRepository.isText = false; },
//             () => {
//                 console.log('before get touserid is: ', this.emailToUserId);
//                 this.appRepository.doGet('https://4226-25056.el-alt.com/dex/hypertext/l1/getbytouserid/keep/'
//                  + this.emailToUserId)  // updates the email inbox list
//                     .subscribe((data: MessageDto[] ) => {
//                         this.appRepository.messages = data;
//                         this.messages = data; // this.appRepository.messages;
//                         console.log('content of messages is: ', this.messages);
//                         console.log('touserid is: ', this.emailToUserId);

//                     }, (error) => {
//                         this.appRepository.messages = [];
//                         this.messages = []; // this.appRepository.messages;
//                         console.log('doGet failed', error);
//                     });
//             });
 }
}




