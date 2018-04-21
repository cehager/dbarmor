// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-message',
//   templateUrl: './message.component.html',
//   styleUrls: ['./message.component.scss']
// })
// export class MessageComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import {AfterViewInit, Component, OnInit} from '@angular/core';
import { AppRepositoryService, MessageDto } from '../services/apprepository.service';
// import {AppRepositoryService, MessageDto} from './services/app-repository.service';
import {forEach} from '@angular/router/src/utils/collection';
import {MessageService} from 'primeng/components/common/messageservice';
import {Message} from 'primeng/primeng';
import {FormControl} from '@angular/forms';
import {DataTable} from 'primeng/primeng';

declare var $: any;

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewInit {

    // msgGrowls: Message[] = [];

  messages: MessageDto[];
    rowsSelected: Array<MessageDto>;
    editorContent: string;
    emailTo: string;
    emailSubject: string;
    emailUser: string;
    emailMsgId: string;
    emailFrom: string;
    emailFromUserId: string;
    emailToUserId: string;
    toUserId: string;

    lastRowSelected: any;
    apiPath: string;
    ed: any;
    edContentGet: string;
    delay: number;
    // rowSelected: any;
    constructor(public appRepository: AppRepositoryService, private messageSvc: MessageService) {  }

    options: Object = {
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
        placeholderText: 'Start typing here...',
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

    onRowSelected(lastRow) {
        // console.log('all rows selected are: ', this.rowsSelected);
        // this.messages = this.rowsSelected;
        this.editorContent = this.rowsSelected[0].message;
        this.emailUser = this.rowsSelected[0].userId;
        this.emailMsgId = this.rowsSelected[0].messageId;
        this.emailTo = this.rowsSelected[0].to;
        this.emailSubject = this.rowsSelected[0].subject;
        this.emailFrom = this.rowsSelected[0].from;
        this.lastRowSelected = lastRow;
        // this.toUserId = this.rowsSelected[0].toUserId;
        // this.ed.froalaEditor('edit.off');
        // console.log('messages: ', this.rowsSelected[0].message);
    }

  ngOnInit() {
      $.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
      $.FroalaEditor.RegisterCommand('alert', {
          title: 'Blackout',
          focus: false,
          undo: false,
          refreshAfterCallback: true,

          callback: function () {
              alert('This is a future feature that will cause highlighted text to be blacked out!');
          }
      });

      $.FroalaEditor.DefineIcon('clear', {NAME: 'ban'});
      $.FroalaEditor.RegisterCommand('clear', {
          title: 'Clear (remove all text)',
          focus: false,
          undo: true,
          refreshAfterCallback: true,
          callback: function () {
              this.html.set('');
              this.apprepository.isText = true;
              this.events.focus();
          }
      });

      $.FroalaEditor.DefineIcon('archive', {NAME: 'shield'});
      $.FroalaEditor.RegisterCommand('archive', {
          title: 'Save Local',
          focus: true,
          undo: true,
          refreshAfterCallback: true,
          callback: function () {
              this.events.focus();
          }
      });


      $.FroalaEditor.DefineIcon('delete', {NAME: 'trash'});
      $.FroalaEditor.RegisterCommand('delete', {
          title: 'Delete',
          undo: true,
          refreshAfterCallback: true,
          callback: function () {
          }
      });

      // NOTE: needs to be moved to emailRespository.getFor("userid") & returns all encrypted emails.
      // this.appRepository.doGet()
      //     .subscribe((data: MessageDto[] ) => {
      //       this.appRepository.messages = data;
      //       this.messages = this.appRepository.messages;
      //
      //       // console.log('content of messages is: ', this.messages);
      //     }, (error) => { console.log('doGet failed', error); });

      this.edContentGet = 'html.get';
      this.ed = $('div#fred');

      this.appRepository.isText = true;
      // this.messageSvc.add({severity: 'success', summary: 'In-Box Messages', detail: 'Click on message to view in editor.'});
      // this.delay = 5000;
      // this.msgGrowls.push({severity: 'success', summary: 'In-Box Messages', detail: 'Click on message to view in editor.'});

      this.ed.on('froalaEditor.save.before', (e, editor) => {
          alert('Text has been encrypted and saved.');
      });

      // this.ed.clear();
      this.ed.on('froalaEditor.commands.before', (e, editor, cmd, param1, param2) => {
          console.log('command is: ', cmd);
          if (cmd === 'archive') {
              this.doEncrypt();
          }
      });

      // this.appRepository.doGet().subscribe( (data: MessageDto[]) => {
      //     this.appRepository.messages = data;
      //     this.messages = data; });

  }

    ngAfterViewInit() {
        // this.apiPath = 'https://4226-25056.el-alt.com/dex/hypertext/l1/do';
         // this.appRepository.doGet('http://localhost:5445/dex/hypertext/l1/getbytouserid/keep/'
         // + this.appRepository.activeUserId) // updates the email inbox list
         this.appRepository.doGet('https://4226-25056.el-alt.com/dex/hypertext/l1/getbytouserid/keep/'
                + this.appRepository.activeUserId) // updates the email inbox list
            .subscribe((data: MessageDto[] ) => {
                this.appRepository.messages = data;
                this.messages = this.appRepository.messages;
                console.log('ngAfterViewInit fired : ', this.messages);
            });

         // this.appRepository.doGet().subscribe( (data: MessageDto[]) => {
         //     this.appRepository.messages = data;
         //     this.messages = data; });
        // console.log('ngAfterViewInit fired : ', this.messages);
    }


    doEditCompleted(editInfo) {
      const fieldChanged = editInfo.column.field;
      const newRowValues = editInfo.data;
      console.log('field changed is: ', fieldChanged);
      console.log('row values are: ', newRowValues);
    }


    doEncrypt() {
        let rmsg = this.ed.froalaEditor(this.edContentGet);
        console.log('editor content is: ', rmsg);
        rmsg = rmsg.replace(/&nbsp;/gi, '');
        rmsg = rmsg.trim();
        console.log('editor content is: ', rmsg);
        if (this.ed.froalaEditor('charCounter.count') < 20) {
            this.editorContent = this.editorContent
                + '<br><br>Message must be at least 20 characters in length. This will go away with automatic padding.';
            return;
        }
        this.appRepository.messageDto.to = this.emailTo;
        this.appRepository.messageDto.from = this.appRepository.activeUserLoginName;  // this.emailFrom;
        this.appRepository.messageDto.messageId = 'mid';
        // this.appRepository.messageDto.createdOn = new Date().toDateString();
        // this.appRepository.messageDto.deleteAfter = new Date().toDateString();
        this.appRepository.messageDto.userId = this.appRepository.activeUserId;
        this.appRepository.messageDto.fromUserId = this.appRepository.activeUserId;
        console.log('email subject content is: ', this.emailSubject);
        this.appRepository.messageDto.subject = this.emailSubject;

        this.apiPath = 'https://4226-25056.el-alt.com/dex/hypertext/l1/do';
        // this.apiPath = 'http://localhost:5445/dex/hypertext/l1/do';
        this.appRepository.doEncrypt(rmsg, this.apiPath)
            .subscribe((data: MessageDto) => {
                this.editorContent = data.message; // updates secure editor
                this.appRepository.isText = false;
                this.appRepository.messageDto.messageId = data.messageId;
               // this.ed.froalaEditor('edit.off');
            }, () => { this.editorContent = 'Not authorized to encrypt text, please login first.';  this.appRepository.isText = true; });
                // () => {
                //     this.appRepository.doGet('http://localhost:5445/dex/hypertext/l1/getbymsgid/keep/'
                // + this.appRepository.messageDto.messageId) // updates the email inbox list
                //         .subscribe((data: MessageDto[] ) => {
                //             this.appRepository.messages = data;
                //             this.messages = this.appRepository.messages;
                //             // console.log('content of messages is: ', this.messages);
                //         }, (error) => { console.log('doGet failed', error); });
                // });


    }

    doDecrypt() {
        this.apiPath = 'https://4226-25056.el-alt.com/dex/hypertext/l1/getbymsgid/undo/';
        // this.apiPath = 'http://localhost:5445/dex/hypertext/l1/getbymsgid/undo/';
        console.log('row selected msgid is: ', this.emailMsgId);
        // this.appRepository.doDecrypt(this.ed.froalaEditor(this.edContentGet), this.apiPath)
        this.appRepository.doDecrypt(this.emailMsgId, this.apiPath)
            .subscribe((data: MessageDto) => {
                console.log('last row selected', this.lastRowSelected);
                console.log('MessageDto back from server is: ', data);
                this.editorContent = data.message; // updates the secure editor
                this.emailUser = data.userId;
                this.emailMsgId = data.messageId;
                this.emailTo = data.to;
                this.emailToUserId = data.toUserId;
                this.emailSubject = data.subject;
                this.emailFrom = data.from;
                this.emailFromUserId = data.from;
                this.emailFrom = data.fromUserId;

                this.appRepository.isText = true;
            }, () => { this.editorContent = 'No longer available, previously decrypted';  this.appRepository.isText = false; },
                () => {
                    console.log('before get touserid is: ', this.emailToUserId);
                    this.appRepository.doGet('http://localhost:5445/dex/hypertext/l1/getbytouserid/keep/'
                     + this.emailToUserId)  // updates the email inbox list
                        .subscribe((data: MessageDto[] ) => {
                            this.appRepository.messages = data;
                            this.messages = data; // this.appRepository.messages;
                            console.log('content of messages is: ', this.messages);
                            console.log('touserid is: ', this.emailToUserId);

                        }, (error) => {
                            this.appRepository.messages = [];
                            this.messages = []; // this.appRepository.messages;
                            console.log('doGet failed', error);
                        });
                });
    }
}

// this.appRepository.messageDto.messageId = 'messageid';
// this.appRepository.messageDto.createdOn = new Date().toDateString();
// this.appRepository.messageDto.deleteAfter = new Date().toDateString();
//
// // const dhold = new Date();
// // this.appRepository.messageDto.deleteAfter = dhold.setDate(dhold.getDate() + 15).toString();
// this.appRepository.messageDto.subject = this.emailSubject;
// this.appRepository.messageDto.to = this.emailTo;

