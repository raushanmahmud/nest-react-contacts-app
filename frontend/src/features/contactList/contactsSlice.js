import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {client} from '../../api/client'

const initialState = {
  contacts: [],
  totalCount: 0,
  pagesCount: 1,
  curPage: 1,
  status: 'idle',
  error: null,
  nameFilter: '',
  lastNameFilter: '',
  phoneFilter: ''
}

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async ({page, name, lastName, phone}) => {
  const response = await client.get('/', {
    page : page || null,
    name : name || null,
    lastName : lastName || null,
    phone : phone || null
  })
  return response
})

export const addNewContact = createAsyncThunk(
    'contacts/addNewContact',
    async initialContact => {
      const response = await client.post('/', initialContact)
      return response
    }
)

export const updateContact = createAsyncThunk(
    'contacts/updateContact',
    async updatedContact => {
      const response = await client.patch(`/${updatedContact.id}/`, updatedContact)
      response.data = {};
      response.data.id = updatedContact.id;
      response.data.name = updatedContact.name;
      response.data.lastName = updatedContact.lastName;
      response.data.phone = updatedContact.phone;
      response.data.dateOfBirth = updatedContact.dateOfBirth;
      return response
    }
)

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async contactToDelete => {
      const response = await client.deleteRequest(`/${contactToDelete.id}`)
      response.id = contactToDelete.id;
      return response
    }
)

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setCurPage: (state, action) => {
      state.curPage = action.payload;
      state.status = 'idle'
      state.error = ''
    },
    setNameFilter: (state, action) => {
      state.nameFilter = action.payload;
    },
    setLastNameFilter: (state, action) => {
      state.lastNameFilter = action.payload;
    },
    setPhoneFilter: (state, action) => {
      state.phoneFilter = action.payload;
    },
    setFilterOn: (state, action) => {
      state.curPage = 1
      state.status = 'idle'
      state.error = ''
    }
  },
  extraReducers: {
    [fetchContacts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchContacts.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.status = 'succeeded'
        state.contacts = action.payload.data.contacts
        console.log(action.payload)
        state.totalCount = Number(action.payload.data.count)
        state.pagesCount = Math.ceil(state.totalCount / 5)
      } else {
        state.status = 'failed'
        state.error = JSON.stringify(action.payload.message)
      }
    },
    [fetchContacts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = JSON.stringify(action.error.message)
    },
    [addNewContact.fulfilled]: (state, action) => {
      if (action.payload.status===200 || action.payload.status===201){
        if (state.contacts.length<5)
          state.contacts.push(action.payload.data)
        state.totalCount = state.totalCount + 1
        state.pagesCount = Math.ceil(state.totalCount / 5)
        if (state.curPage!==state.pagesCount){
          state.status = 'idle'
          state.curPage = state.pagesCount
        }

      }
    },
    [updateContact.fulfilled]: (state, action) => {
      if (action.payload.status===200){
          const { id, name, lastName, phone, dateOfBirth } = action.payload.data
          const existingContact = state.contacts.find(contact => contact.id === id)
          if (existingContact) {
            existingContact.name = name
            existingContact.lastName = lastName
            existingContact.phone = phone
            existingContact.dateOfBirth = dateOfBirth
          }

      }
    },
    [deleteContact.fulfilled]: (state, action) => {
      console.log(action.payload)
      if (action.payload.status===200){
        state.contacts = state.contacts.filter(contact=>contact.id!==action.payload.id)
        state.totalCount = state.totalCount - 1

        if (state.curPage !== state.pagesCount ){
          state.pagesCount = Math.ceil(state.totalCount / 5)
          state.status = 'idle'
          if (state.curPage>state.pagesCount) {
            state.curPage = state.pagesCount-1
          }
        } else {
          if (state.contacts.length<1){
            state.status = 'idle'
            state.curPage = state.pagesCount-1
          }
        }

      }
    },
  }
})

export const { contactAdded, contactUpdated, setCurPage, setNameFilter, setLastNameFilter, setPhoneFilter, setFilterOn } = contactsSlice.actions

export default contactsSlice.reducer

export const selectAllContacts = state => state.contacts.contacts
export const selectContactsCount = state => state.contacts.totalCount
export const selectCurPage = state => state.contacts.curPage
export const selectPagesCount = state => state.contacts.pagesCount
export const selectNameFilter = state => state.contacts.nameFilter
export const selectLastNameFilter = state => state.contacts.lastNameFilter
export const selectPhoneFilter = state => state.contacts.phoneFilter
