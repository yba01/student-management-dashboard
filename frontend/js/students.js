
import { showstudents } from './load.js'
import { reset, bindAutoFilter  } from './filter.js'
import { attachecheckbox, importdb, importjsontodb } from './import.js'
import { setupInlineEdit } from './edit.js'
import { createStudent } from './create.js'


//load students for the first
showstudents()

//filtering data
document.getElementById("resetFiltersBtn").addEventListener("click", () => {
    reset()
    // Reset pagination state
    currentPage = 1;
    hasMore = true;
    loading = false;
    showstudents()
}) 
bindAutoFilter()
document.getElementById("activeViewBtn")?.addEventListener("click", () => { location.reload()  });

//importing data in the db
attachecheckbox()
document.getElementById("importSelectedBtn")?.addEventListener("click", () => {importdb()})
importjsontodb()

//editing  data
setupInlineEdit()

//creating students
createStudent()
