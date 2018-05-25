import {AfterViewInit, Component, OnInit} from '@angular/core';
import { AppRepositoryService} from '../services/apprepository.service';
// import {AppRepositoryService, MessageDto} from './services/app-repository.service';
import {forEach} from '@angular/router/src/utils/collection';
import {MessageService} from 'primeng/components/common/messageservice';
import {Message, MenuItem} from 'primeng/primeng';
import {FormControl} from '@angular/forms';
import {DataTable} from 'primeng/primeng';
import {DailyLog} from '../services/models/daily-log'; //interface definition
import { AlertifyService } from '../services/alertify.service';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-daily-log',
  templateUrl: './daily-log.component.html',
  styleUrls: ['./daily-log.component.scss']
})
export class DailyLogComponent implements OnInit, AfterViewInit {
    dailyLogs: DailyLog[];
    items: MenuItem[];
    rowsSelected: Array<DailyLog>;
    editorContent: string;
    logDate: string;
    summary: string;
    message: string;
    userId: string;
    lid: number;
    logId: string;
    currentDailyLog: any;
    rating: number;
    lastRowSelected: any;
    apiPath: string;
    ed: any;
    edContentGet: string;
    delay: number;
    isMsgText: boolean;
    // rowSelected: any;
    constructor(public appRepository: AppRepositoryService, private messageSvc: MessageService, private alertify: AlertifyService) {  }

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
        placeholderText: 'PRIVATIZE your day, start typing here...',
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


    onRowSelected(event) {
        this.currentDailyLog.logId = event.data.logId;
        //this.currentDailyLog.logDate = event.data.logDate;
        this.currentDailyLog.logDate = moment(event.data.logDate).format('MM/DD/YYYY');
        this.currentDailyLog.summary = event.data.summary;
        this.currentDailyLog.userId = event.data.userId;
        this.currentDailyLog.message = event.data.message;
        this.currentDailyLog.rating = event.data.rating;
        this.logId = event.data.logId;
        console.log('event data logdate is: ', event.data.logDate);
        this.logDate = moment(event.data.logDate).format('MM/DD/YYYY');
        //let ld = moment(event.data.logDate);
        //this.logDate = ld.format('MM/DD/YYYY');   //event.data.logDate;
        //console.log('log date is: ', ld);
        console.log('log date is: ', this.logDate);
        this.summary = event.data.summary;
        this.userId = event.data.userId;
        this.message = event.data.message;
        this.rating = event.data.rating;
        this.editorContent = event.data.message;
        this.isMsgText = false;
        this.ed.froalaEditor('edit.off');
        //console.log('on row selected is: ', this.currentDailyLog);
    }

    // onRowSelected(lastRow) {
    //     // console.log('all rows selected are: ', this.rowsSelected);
    //     // this.messages = this.rowsSelected;
    //     this.editorContent = this.rowsSelected[0].message;
    //     this.userId = this.rowsSelected[0].userId;
    //     this.lid = this.rowsSelected[0].Id;
    //     this.summary = this.rowsSelected[0].summary;
    //     this.logDate = this.rowsSelected[0].logDate;
    //     this.lastRowSelected = lastRow;
    //     // this.toUserId = this.rowsSelected[0].toUserId;
    //     // this.ed.froalaEditor('edit.off');
    //     // console.log('messages: ', this.rowsSelected[0].message);
    // }

  ngOnInit() {
      this.lid = 0;
      this.currentDailyLog = new Object();

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
              //this.apprepository.isText = true;
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

      this.edContentGet = 'html.get';
      this.ed = $('div#fred');

      this.ed.on('froalaEditor.save.before', (e, editor) => {
          alert('Text has been encrypted and saved.');
      });

      this.ed.on('froalaEditor.commands.before', (e, editor, cmd) => {
          console.log('command is: ', cmd);
          if (cmd === 'archive') {
              this.doEncrypt();
          }
      });

      this.items = [
        {label: 'Create New Log/Diary Entry', icon: 'fa-refresh', command: () => {
            this.doCreateNewLogEntry();
            this.isMsgText = true;
            //this.alertify.message('Create New Message');
        }},
        {label: 'Archive', icon: 'fa-close', command: () => {
            this.alertify.message('Archive');
            this.isMsgText = true;
        }},
        {label: 'Save Local', icon: 'fa-close', command: () => {
            this.alertify.message('Save Local');
            this.isMsgText = true;
        }},
        {label: 'Delete', icon: 'fa-close', command: () => {
            this.alertify.message('delete');
            this.isMsgText = true;
        }}
        ];

        this.ed.on('froalaEditor.commands.after', (e, editor, cmd, param1, param2) => {
            //console.log('command is: ', cmd);
            if (cmd === 'save') {
                this.doEncrypt();
                //this.alertify.success('Message has been saved!');
            }
        });

        this.ed.on('froalaEditor.commands.after', (e, editor, cmd, param1, param2) => {
            console.log('command is: ', cmd);
            if (cmd === 'clear') {
                this.isMsgText = true;
            }
        });

        this.rating = 4;

        this.isMsgText = true;
        this.ed.froalaEditor('edit.on');
  }

    ngAfterViewInit() {
        // this.apiPath = 'https://4226-25056.el-alt.com/dex/hypertext/l1/do';
          this.appRepository.doGet(this.appRepository.getApiBasePath() + 'dailylog/l1/getbyuserid/keep/'
          + this.appRepository.activeUserId) // updates the email inbox list
         //this.appRepository.doGet('https://4226-25056.el-alt.com/dex/hypertext/l1/getbyuserid/keep/'
           //     + this.appRepository.activeUserId) // updates the email inbox list
            .subscribe((data: DailyLog[] ) => {
                //this.appRepository.messages = data;
                this.dailyLogs = data; // this.appRepository.messages;
                for (let i = 0; i < this.dailyLogs.length; i++) {
                    this.dailyLogs[i].logDate = moment(this.dailyLogs[i].logDate).format('MM/DD/YYYY');
                }
                console.log('ngAfterViewInit fired : ', this.dailyLogs);
            });

         // this.appRepository.doGet().subscribe( (data: MessageDto[]) => {
         //     this.appRepository.messages = data;
         //     this.messages = data; });
        // console.log('ngAfterViewInit fired : ', this.messages);
    }


    // doEditCompleted(editInfo) {
    //   const fieldChanged = editInfo.column.field;
    //   const newRowValues = editInfo.data;
    //   console.log('field changed is: ', fieldChanged);
    //   console.log('row values are: ', newRowValues);
    // }

    doCreateNewLogEntry() {
        this.editorContent = '';
        //this.logDate = new Date().toLocaleDateString();
        this.summary = ''; // moment().dayOfYear().toString();
        this.isMsgText = true;
        this.rating = 4;
        this.ed.froalaEditor('edit.on');
    }



    doEncrypt() {
        let rmsg = this.ed.froalaEditor(this.edContentGet);
        //console.log('editor content is: ', rmsg);
        rmsg = rmsg.replace(/&nbsp;/gi, '');
        rmsg = rmsg.trim();
        if (rmsg.length === 0) {
            //console.log('editor content is: ', rmsg);
            this.alertify.dialog('Got It!', '<h3>There is nothing to encrypt!<h3>');
            return;
        }
        console.log('log date on encrypting is: ', this.logDate);
         let m = moment(this.logDate);
         if (!m.isValid() || this.logDate === 'undefined' || this.logDate === null) {
            this.alertify.dialog('Got It!', 'Please enter a valid date. (Today\'s date has been inserted for your convenience).');
            this.logDate = moment().format('MM/DD/YYYY');
            return;
         }

        this.apiPath = this.appRepository.getApiBasePath() + 'dailylog/l1/do';
        // if (this.ed.froalaEditor('charCounter.count') < 1) {
        //     this.editorContent = this.editorContent
        //         + '<br><br>Message must be at least 20 characters in length. This will go away with automatic padding.';
        //     return;
        // }
        //this.message = rmsg;

        //this.apiPath = 'http://localhost:5445/dex/dailylog/l1/do';
        //this.apiPath = 'https://4226-25056.el-alt.com/dex/dailylog/l1/do';
        console.log('apiPath is: ' + this.apiPath);
        console.log('rmsg is: ', rmsg);
        console.log('active user id is: ', this.appRepository.activeUserId);
        this.currentDailyLog.userId = this.appRepository.activeUserId; //this.userId;
        this.currentDailyLog.logDate = this.logDate;
        this.currentDailyLog.message = rmsg;
        this.currentDailyLog.rating = this.rating;
        this.currentDailyLog.summary = this.summary;
        this.currentDailyLog.logId = this.appRepository.makeId(32); //this.logId;
        console.log('current daily log is: ', this.currentDailyLog);

        this.appRepository.doEncryptDailyLog(this.currentDailyLog, this.apiPath)
            .subscribe((data: DailyLog) => {
                this.editorContent = data.message; // updates secure editor
                this.isMsgText = false;
                this.ed.froalaEditor('edit.off');
                //this.appRepository.isText = true;

                //this.appRepository.messageDto.messageId = data.messageId;
               // this.ed.froalaEditor('edit.off');
            }, () => { this.editorContent = 'Not authorized to encrypt text, please login first.';  this.isMsgText = true; },
            () => {
                console.log('before do re-get userid is: ', this.userId);
                this.appRepository.doGet(this.appRepository.getApiBasePath() + 'dailylog/l1/getbyuserid/keep/'
                //this.appRepository.doGet('https://4226-25056.el-alt.com/dex/hypertext/l1/getbytouserid/keep/'
                 + this.appRepository.activeUserId)  // updates the email inbox list
                    .subscribe((data: DailyLog[] ) => {
                        this.dailyLogs = data;
                        for (let i = 0; i < this.dailyLogs.length; i++) {
                            this.dailyLogs[i].logDate = moment(this.dailyLogs[i].logDate).format('MM/DD/YYYY');
                        }
                        //this.messages = data; // this.appRepository.messages;
                        console.log('content of returned data is: ', data);
                        //console.log('touserid is: ', this.emailToUserId);

                    }, (error) => {
                        this.appRepository.messages = [];
                        this.dailyLogs = []; // this.appRepository.messages;
                        console.log('doGet failed', error);
                    });
            });
    }

    doDecrypt() {
        //this.apiPath = 'https://4226-25056.el-alt.com/dex/dailylog/l1/getbylogid/undo/';
        this.apiPath = this.appRepository.getApiBasePath() + 'dailylog/l1/getbylogid/undo/' + this.currentDailyLog.logId;
        console.log('row selected logid is: ', this.currentDailyLog.logId);
        console.log('logid is: ', this.logId);
        // this.appRepository.doDecrypt(this.ed.froalaEditor(this.edContentGet), this.apiPath)
        this.appRepository.doDecryptDailyLog(this.currentDailyLog, this.apiPath)
            .subscribe((data: DailyLog) => {
                console.log('last row selected', this.lastRowSelected);
                console.log('DailyLog back from server is: ', data);
                this.editorContent = data.message; // updates the secure editor
                this.isMsgText = true;
                this.ed.froalaEditor('edit.on');
                this.userId = data.userId;
                this.logId = data.logId;
                this.message = data.message;
                this.rating = data.rating;
                this.summary = data.summary;
                //this.logDate = data.logDate;
                // let ld = moment(data.logDate);
                // this.logDate = ld.format('MM/DD/YYYY');   //event.data.logDate;
                this.logDate = moment(data.logDate).format('MM/DD/YYYY');   //event.data.logDate;
                this.lid = data.Id;
                //this.appRepository.isText = true;
            }, () => { this.editorContent = 'No longer available, previously decrypted';  this.isMsgText = true; },
                () => {
                    console.log('before do re-get userid is: ', this.userId);
                    this.appRepository.doGet(this.appRepository.getApiBasePath() + 'dailylog/l1/getbyuserid/keep/'
                     + this.userId)  // updates the email inbox list
                        .subscribe((data: DailyLog[] ) => {
                            this.dailyLogs = data;
                            for (let i = 0; i < this.dailyLogs.length; i++) {
                                this.dailyLogs[i].logDate = moment(this.dailyLogs[i].logDate).format('MM/DD/YYYY');
                            }
                            //this.messages = data; // this.appRepository.messages;
                            console.log('content of returned data is: ', data);
                            //console.log('touserid is: ', this.emailToUserId);

                        }, (error) => {
                            this.appRepository.messages = [];
                            this.dailyLogs = []; // this.appRepository.messages;
                            console.log('doGet failed', error);
                        });
                });
    }
}
