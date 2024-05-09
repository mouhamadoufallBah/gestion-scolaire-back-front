import { RoleIdToRoleNamePipe } from './role-id-to-role-name.pipe';

describe('RoleIdToRoleNamePipe', () => {
  it('create an instance', () => {
    const pipe = new RoleIdToRoleNamePipe();
    expect(pipe).toBeTruthy();
  });
});
