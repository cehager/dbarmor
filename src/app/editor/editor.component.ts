import {Component, OnInit} from '@angular/core';
import { AppRepositoryService, MessageDto } from '../services/apprepository.service';
declare var $: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editorContent = '';
  editor: any;
  ed: any;
  message: string;
  edContentGet: string;
  apiPath: string;
  display: boolean;
  decrypt: boolean;
  tempMsgId: string;
  msgId: string;
  tid = Array.apply(null, Array(10));
  letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
               'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
               'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
               'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
               '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2',
                '3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '4', '5',
                 '6', '7', '8', '9'];
  // messageDto: MessageDto = {
  //     message: '',
  //     createdOn: '11/27/2017',
  //     deleteAfter: '12/27/2017'
  // };
// toolbarButtonsMD: ['bold', 'italic', 'underline', 'strikeThrough',
// toolbarButtons: ['bold', 'italic', 'underline', 'alert', ],
// toolbarButtonsXS: ['bold', 'italic', 'underline', 'alert', ],
// toolbarButtonsSM: ['bold', 'italic', 'underline', 'alert', ],
// toolbarButtonsMD: ['bold', 'italic', 'underline', 'alert', ],
// 'fontSize', 'alert', ],


  constructor(public appRepository: AppRepositoryService) { }

  options: Object = {
      charCounterCount: true,
      toolbarButtons: ['fontFamily', 'fontSize', 'color', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
      'superscript', 'align', 'outdent', 'indent', 'paragraphFormat',
     'insertHR', 'clearFormatting', 'undo', 'redo',  'emoticons', 'print', 'spellChecker',
      '|', 'alert', 'clear', 'save', 'archive', 'delete'],
  toolbarButtonsXS: ['bold', 'italic', 'underline', 'strikeThrough',
      'fontSize', 'alert', 'paragraphFormat'],
  toolbarButtonsSM: ['bold', 'italic', 'underline', 'strikeThrough',
      'fontSize', 'alert', 'paragraphFormat'],
  toolbarButtonsMD: ['fontFamily', 'fontSize', 'color', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
  'superscript', 'align', 'outdent', 'indent', 'paragraphFormat',
 'insertHR', 'clearFormatting', 'undo', 'redo',  'emoticons', 'print', 'spellChecker',
  '|', 'alert', 'clear', 'save', 'archive', 'delete'],
      quickInsertButtons: [],
      height: 290,
      fontSizeDefaultSelection: '14',
      placeholderText: 'Privatize yourself, start typing here...',
      saveInterval: 0,
      pastePlain: false,
      pasteAllowLocalImages: true,
      pasteDeniedTags: [],
      pasteDeniedAttrs: [],
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
      // console.log('in onInit' );
      $.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
      $.FroalaEditor.RegisterCommand('alert', {
          title: 'Blackout',
          focus: false,
          undo: false,
          refreshAfterCallback: false,

          callback: function () {
              alert('This is a future feature that will cause highlighted text to be blacked out!');
          }
      });

      this.edContentGet = 'html.get';
      this.ed = $('div#fred');
      this.editorContent = this.appRepository.reloadEditorContent();

      // this.ed.froalaEditor('popups.hideAll');

      if (this.appRepository.isEdBufferEmpty()) {
          this.appRepository.isText = true;
      }

      // this.appRepository.reloadEditorContent();
      // this.setFocusEvent();
      this.setCounterUpdateEvent();
      // this.doAfterPaste();
      // this.doBeforeCleanup();
  }



  setCounterUpdateEvent() {
      this.ed.on('froalaEditor.charCounter.update', (e, editor) => {
        if (this.ed.froalaEditor('core.isEmpty')) {
            console.log('is editor empty: ', this.appRepository.isText);
            this.appRepository.isText = true;
        }
      });
  }

  // setFocusEvent() {
  //     this.ed.on('froalaEditor.focus', (e, editor) => {
  //         this.isText = !this.isText;
  //         console.log('editor is here: ', editor);
  //     });
  // }

//   doBeforeCleanup() {
//       this.ed.on('froalaEditor.paste.beforeCleanup', (e, editor, clipboard_html) => {
//           console.log('clipboard is: ', clipboard_html );
//           this.appRepository.isText = !this.appRepository.doIOF(clipboard_html);
//           this.appRepository.reloadEditorContent();
//       });
//   }

  doAfterPaste() {
      this.ed.on('froalaEditor.paste.afterCleanup', (e, editor, clipboard_html) => {
         this.appRepository.isText = !this.appRepository.doIOF(clipboard_html);
         this.appRepository.reloadEditorContent();
      });
  }

  doEncrypt() {
      this.makeTempId();
    // this.tempMsgId = 'littlefox102';  // need a method to generate an ID
    this.appRepository.tempFreeId = this.tempMsgId;
    this.display = true;
      let rmsg = this.ed.froalaEditor(this.edContentGet);
      console.log('editor content is before: ', rmsg);
      rmsg = rmsg.replace(/&nbsp;/gi, '');
      // rmsg = rmsg.replace(/<br>/gi, '');
      rmsg = rmsg.trim();
      if (rmsg.length === 0) {
          return;
      }
      console.log('editor content is after: ', rmsg);

      if (this.ed.froalaEditor('charCounter.count') < 20) {
          this.editorContent = this.editorContent
              + '<br><br>Message must be at least 20 characters in length.';
          return;
      }

      //this.apiPath = 'http://localhost:5445/dex/hypertext/l1/trialdo';
      this.apiPath = 'https://4226-25056.el-alt.com/dex/hypertext/l1/trialdo';
      this.appRepository.doEncrypt(rmsg, this.apiPath)
          .subscribe((data: MessageDto) => {
              this.editorContent = data.message;
              this.appRepository.messageDto.messageId = data.messageId;
              this.appRepository.isText = false;
          }, () => { this.editorContent = 'Error encrypting text';  this.appRepository.isText = true; });
  }

  doDecrypt() {
      // this.appRepository.tempFreeId = '';
      // this.msgId = '';

      // this.decrypt = true;  // this opens the decrypt id dialog
      //this.apiPath = 'http://localhost:5445/dex/hypertext/l1/gettrialbymsgid/undo/';
      this.apiPath = 'https://4226-25056.el-alt.com/dex/hypertext/l1/gettrialbymsgid/undo/';
      console.log('messageDto is ', this.appRepository.messageDto);
      this.appRepository.messageDto.message = this.ed.froalaEditor(this.edContentGet);
      this.appRepository.messageDto.messageId = this.msgId;   // this.appRepository.messageDto.message.substring(0, 20);
      this.appRepository.doDecrypt(this.appRepository.messageDto.messageId, this.apiPath)
          .subscribe((data: MessageDto) => {
              this.editorContent = data.message;
              this.appRepository.isText = true;
              this.appRepository.tempFreeId = ''; // this is the id created by MakeTempId() below, used to provide an id for free encryption
              this.msgId = ''; // this is the value that is entered by the user to decrypt a free encryption msg
          }, () => { this.editorContent = 'No longer available, previously decrypted';  this.appRepository.isText = false; });
  }

  onClick() {
     alert('button has been clicked!');
  }

    onClose() {
        // alert('message id:');
        // alert(this.tempMsgId);
        this.decrypt = true;
    }

    diaClose() {
        // this.makeTempId();
        this.appRepository.tempFreeId = this.msgId;
        this.doDecrypt();
        this.decrypt = false;
        this.tempMsgId = '';
        this.msgId = '';
    }

    onOpen() {
        this.decrypt = true;
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

      generateGUID() { // Public Domain/MIT
        let d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
                        d += performance.now(); // use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }


      shuffle (array) {
        let i = 0
          , j = 0
          , temp = '';

        for (i = array.length - 1; i > 0; i -= 1) {
          j = Math.floor(Math.random() * (i + 1));
          temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }


    makeTempId() {
        let j = 0;
    this.shuffle(this.letters);
    this.shuffle(this.letters);

    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
    // console.log('"Your lucky numbers:');
    for (let i = 0; i < array.length; i++) {
        j = array[i] % 82;
        this.tid[i] = this.letters[j];
        console.log(this.tid[i]);
    }

    this.tempMsgId = this.tid.join('');

    // console.log(this.uuidv4());
    // console.log(this.generateGUID());

    // this.tempMsgId = array[0].toString();

    }
}
