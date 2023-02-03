import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView, AccountsView, TransactionsView } from '../views';
import { useDispatch, useSelector } from 'react-redux';


export const JournalPage = () => {
  const { activeOption } = useSelector( state => state.options );
  return (
    <JournalLayout>
      
      {/* <Typography>Sint id officia amet velit do aliqua aliqua est ea velit minim voluptate duis laboris. Esse esse consectetur ullamco excepteur ullamco amet. Mollit est nostrud nisi irure magna dolor eiusmod aliquip aliqua nostrud incididunt enim. Velit ipsum laborum Lorem anim laboris aute ullamco ipsum do adipisicing irure.</Typography> */}
      {activeOption === 'DASHBOARD' && <NothingSelectedView />}
      {activeOption === 'ACCOUNTS' && <AccountsView />}
      {activeOption === 'TRANSACTIONS' && <TransactionsView />}
      
      {/* <NoteView /> */}


      
    </JournalLayout>
  )
}
