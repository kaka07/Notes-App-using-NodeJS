const validator=require('validator')
const chalk=require('chalk')
const yargs=require('yargs')
const notes=require('./notes')
yargs.version('1.1.0')
yargs.command({
    command:'add',
    describe:'Add a note',
    builder: {
        title: {
            describe:'Note title',
            demandOption:true,
            type:'string'
        },
        body: {
            describe: 'Note body',
            demandOption:true,
            type:'string',
        }
    },
    handler: function(argv){
        notes.addNote(argv.title,argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command:'list',
    describe:'List a note',
    handler:function(){
        notes.listNotes()
    }
})

yargs.command({
    command:'read',
    describe:'Read a note',
    builder:{
        title:{
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv){
        notes.readNote(argv.title)
    }
})
yargs.parse()
//console.log(yargs.argv)