// in src/LoginPage.js
import * as React from 'react';
import { useLogin, useNotify } from 'react-admin';
import { getClaims } from 'common/auth';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 100px 0;
`;

const StaffCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 62%;
  height: 300px;
  background: #faf9f8;
  color: #5c3d2e;
  border: 1px solid #5c3d2e;
  border-radius: 20px;
`;

const SwitchRoleBtn = styled.button`
  padding: 5px 20px;
`;

const LoginPage = () => {
  const login = useLogin();
  const notify = useNotify();

  const handleLogin = () => {
    login({ role: 'Staff' }).catch(() => notify('Invalid email or password'));
  };
  const claims = getClaims();

  const isStaff =
    (claims &&
      Array.isArray(claims.allowed_roles) &&
      claims.allowed_roles.some(role => role === 'Staff')) ||
    false;
  const nickname = claims?.user.nickname || '???';
  return (
    <Container>
      <StaffCard>
        Welcome to staff console, {nickname}!
        <SwitchRoleBtn
          disabled={!isStaff}
          onClick={() => isStaff && handleLogin()}
        >
          {isStaff ? 'Login' : 'No permission'}
        </SwitchRoleBtn>
      </StaffCard>
    </Container>
  );
};

export default LoginPage;
