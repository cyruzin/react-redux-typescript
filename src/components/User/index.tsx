import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { listUser } from 'redux/ducks/user';

import IStore from 'interfaces/store';
import { IUserState } from 'interfaces/user';

import { format as dateFormat } from 'date-fns';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

import FieldText from '@react-form-fields/material-ui/components/Text';

import Loading from 'components/Common/Loading';

export default function User(): JSX.Element {
  const user = useSelector<IStore, IUserState>(state => state.user);
  const { fetch, results } = user;
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  function search(term: string): void {
    setSearchTerm(term);
    dispatch(listUser(0, 10, searchTerm));
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
        <Typography variant="h4" component="h2" align="center">
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
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={() => false}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
