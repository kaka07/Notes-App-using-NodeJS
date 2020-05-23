const fs=require('fs')
const chalk=require('chalk')
const getNotes=function(){
    return 'Your notes...'
}

const addNote=function(title,body){
    const notes=loadNotes()
    const duplicateNotes=notes.filter(function(note){
        return note.title==title
    })
    if(duplicateNotes.length==0){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        //console.log('New Notes Added')
        console.log(chalk.green.inverse("New Note Added!"))
    }
    else{
        console.log(chalk.red.inverse('Note already taken!'))
    }
}
const removeNote=function(title){
   const notes= loadNotes()
   const notesToKeep=notes.filter(function(note){
       return note.title!=title
   })
   if(notes.length>notesToKeep.length){
      console.log(chalk.green.inverse("Note Deleted Successfully"))
       saveNotes(notesToKeep)
   }
   else{
       console.log(chalk.red.inverse("No Note Deleted"))
   }
}
const readNote=function(title){
    const notes=loadNotes()
    const note=notes.find(function(note){
        return note.title==title
    })
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else
    console.log(chalk.inverse.red('No note found'))
}

const listNotes=function(){
   const notes= loadNotes()
    console.log(chalk.inverse("Your Notes are: "))
    notes.forEach((note)=>{
        console.log(note.title)
    })
}

const saveNotes=function(notes){
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
const loadNotes=function(){
    try {
       const dataBuffer=fs.readFileSync('notes.json')
       const dataJSON=dataBuffer.toString()
       return JSON.parse(dataJSON) 
    } catch (e) {
        return []
    }   
}
module.exports={
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}