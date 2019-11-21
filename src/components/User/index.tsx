import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { listUser, createUser, updateUser, deleteUser } from 'redux/ducks/user';

import IStore from 'interfaces/store';
import { IUserState, IUser } from 'interfaces/user';

import { ERoles } from 'enums/user';

import { format as dateFormat } from 'date-fns';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import FieldText from '@react-form-fields/material-ui/components/Text';

import Loading from 'components/Common/Loading';
import Actions from './Actions';

export default function User(): JSX.Element {
  const user = useSelector<IStore, IUserState>(state => state.user);
  const { fetch, results } = user;
  const dispatch = useDispatch();

  const state: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    roles: [ERoles.user]
  };
  const [form, setForm] = useState(state);

  const [openDialog, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  function search(term: string): void {
    setSearchTerm(term);
    if (!!searchTerm) {
      dispatch(listUser());
    }
    dispatch(listUser(0, 10, searchTerm));
  }

  function handleOpenDialog(user?: IUser): void {
    setOpen(true);
    if (user) {
      const { id, firstName, lastName, email, roles } = user;
      setForm({
        id,
        firstName,
        lastName,
        email,
        roles
      });
    }
  }

  function handleCloseDialog(): void {
    setOpen(false);
    setForm(state);
  }

  function setField(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function formHandler(): any {
    if (form.id) {
      setOpen(false);
      setSearchTerm('');
      return dispatch(updateUser(form));
    }

    setOpen(false);
    setSearchTerm('');
    return dispatch(createUser(form));
  }

  function handleDelete(id: number): void {
    dispatch(deleteUser(id));

    setOpen(false);
    setSearchTerm('');
  }

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {!form.id ? 'Criar' : 'Editar'}
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="normal"
            type="text"
            fullWidth
            id="firstName"
            label="Nome"
            name="firstName"
            value={form.firstName}
            onChange={event => setField(event)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            type="text"
            fullWidth
            id="lastName"
            label="Sobrenome"
            name="lastName"
            value={form.lastName}
            onChange={event => setField(event)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            type="email"
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            value={form.email}
            onChange={event => setField(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={formHandler} color="primary">
            {!form.id ? 'Criar' : 'Editar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Loading show={fetch} />

      <FieldText
        variant="outlined"
        margin="normal"
        type="text"
        fullWidth
        id="search"
        label="Busca"
        name="search"
        value={searchTerm}
        onChange={term => search(term)}
      />

      <Fab color="primary" aria-label="add">
        <AddIcon onClick={() => handleOpenDialog()} />
      </Fab>

      {!fetch && results && results.length === 0 && (
        <Typography variant="subtitle1" component="h2" align="center">
          Sem resultados
        </Typography>
      )}

      {!fetch && results && results.length > 0 && (
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Sobrenome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Criado em</TableCell>
              <TableCell>Atualizado em</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results &&
              results.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.roles.join(', ')}</TableCell>
                  <TableCell>
                    {dateFormat(new Date(user.createdDate), 'dd/mm/yyyy')}
                  </TableCell>
                  <TableCell>
                    {dateFormat(new Date(user.updatedDate), 'dd/mm/yyyy')}
                  </TableCell>
                  <TableCell align="right">
                    <Actions
                      onEdit={() => handleOpenDialog(user)}
                      onDelete={() => handleDelete(user.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
