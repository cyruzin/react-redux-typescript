import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { listUser } from 'redux/ducks/user';

import IStore from 'interfaces/store';
import { IUserState } from 'interfaces/user';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import FieldText from '@react-form-fields/material-ui/components/Text';

export default function User(): JSX.Element {
  const user = useSelector<IStore, IUserState>(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  return (
    <>
      <FieldText
        variant="outlined"
        margin="normal"
        type="text"
        fullWidth
        id="search"
        label="Busca"
        name="search"
        value={''}
        onChange={() => false}
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
          </TableRow>
        </TableHead>
        <TableBody>
          {user.results &&
            user.results.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.roles.join(', ')}</TableCell>
                <TableCell>{row.createdDate}</TableCell>
                <TableCell>{row.updatedDate}</TableCell>
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
    </>
  );
}
