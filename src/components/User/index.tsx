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

export default function User(): JSX.Element {
  const user = useSelector<IStore, IUserState>(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  return (
    <>
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
                <TableCell>{row.roles}</TableCell>
                <TableCell>{row.createdDate}</TableCell>
                <TableCell>{row.updatedDate}</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
