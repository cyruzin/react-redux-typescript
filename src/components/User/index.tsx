import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { listUser, createUser, updateUser, deleteUser } from 'redux/ducks/user';

import IStore from 'interfaces/store';
import { IUserState, IUser } from 'interfaces/user';

import { ERoles } from 'enums/user';

import { format as dateFormat } from 'date-fns';
import debounce from 'lodash/debounce';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import FieldText from '@react-form-fields/material-ui/components/Text';

import Loading from 'components/Common/Loading';
import Modal from 'components/Common/Modal';
import Tags from 'components/Common/Tags';

import Actions from './Actions';

export default function User(): JSX.Element {
  const user = useSelector<IStore, IUserState>(state => state.user);
  const { fetch, results } = user;
  const dispatch = useDispatch();

  const userState: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    roles: []
  };
  const [form, setForm] = useState(userState);
  const [userID, setUserID] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  /* Adds 800 milliseconds delay to the search function
    to prevent multiple calls to the API. */
  const delayedSearch = useCallback(
    debounce((searchTerm?: string) => {
      dispatch(listUser(0, 10, searchTerm));
    }, 800),
    []
  );

  /* Handles user search */
  function search(term: string): void {
    setSearchTerm(term);
    if (!!searchTerm) {
      delayedSearch();
    }
    delayedSearch(searchTerm);
  }

  /* Handles modal opening for user creation and update */
  function handleOpenModal(user?: IUser): void {
    setOpenModal(true);
    if (user) {
      setForm(user);
    }
  }

  /* Handles modal closure for user creation and update */
  function handleCloseModal(): void {
    setOpenModal(false);
    setForm(userState);
  }

  /* Handles modal opening for user deletion */
  function handleOpenDeleteModal(id: number): void {
    setOpenDeleteModal(true);
    setUserID(id);
  }

  /* Handles modal closure for user deletion */
  function handleCloseDeleteModal(): void {
    setOpenDeleteModal(false);
  }

  /* Handle form fields dynamically */
  function setField(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  /* Handle user creation and update */
  function formHandler(): any {
    if (form.id) {
      setOpenModal(false);
      setSearchTerm('');
      return dispatch(updateUser(form));
    }
    setOpenModal(false);
    setSearchTerm('');
    return dispatch(createUser(form));
  }

  /* Handles user deletion */
  function handleDelete(id: number): void {
    dispatch(deleteUser(id));
    setOpenDeleteModal(false);
    setSearchTerm('');
  }

  /* Handles roles changes */
  function handleRolesChange(
    event: React.ChangeEvent<{ value: unknown }>
  ): void {
    setForm({
      ...form,
      roles: event.target.value as ERoles[]
    });
  }

  return (
    <>
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

      {!fetch && results && results.length === 0 && (
        <Typography variant="subtitle1" component="h2" align="center">
          Sem resultados
        </Typography>
      )}

      {!fetch && results && results.length > 0 && (
        <>
          <Modal
            open={openModal}
            title={!form.id ? 'Criar' : 'Editar'}
            closeButtonName="Cancelar"
            confirmButtonName={!form.id ? 'Criar' : 'Editar'}
            handleClose={handleCloseModal}
            handleConfirm={formHandler}
          >
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
            <Tags
              data={Object.keys(ERoles)}
              handleChange={handleRolesChange}
              value={form.roles}
            />
          </Modal>

          <Modal
            open={openDeleteModal}
            title="Deletar"
            closeButtonName="Cancelar"
            confirmButtonName="Confirmar"
            showContentText
            contentText="Tem certeza que deseja deletar este usuário?"
            handleClose={handleCloseDeleteModal}
            handleConfirm={() => handleDelete(userID)}
          />
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
                <TableCell>
                  <Fab color="primary" aria-label="add" size="small">
                    <AddIcon onClick={() => handleOpenModal()} />
                  </Fab>
                </TableCell>
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
                        onEdit={() => handleOpenModal(user)}
                        onDelete={() => handleOpenDeleteModal(user.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}
