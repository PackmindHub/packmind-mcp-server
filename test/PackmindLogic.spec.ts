import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon, { SinonSandbox, SinonStub } from 'sinon';
import { PackmindLogic } from '../src/PackmindLogic.js';
import { PackmindAPI } from '../src/PackmindAPI.js';
import { Space } from '../src/model/Space.js';

describe('PackmindLogic', () => {
  describe('getActualSpace', () => {
    let sandbox: SinonSandbox;
    let packmindLogic: PackmindLogic;
    let mockAPI: PackmindAPI;
    let getSpacesStub: SinonStub;
    
    const spaces: Space[] = [
      { id: '1', name: 'backend' },
      { id: '2', name: 'frontend' }
    ];

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      
      // Create mock API with stubbed getSpaces method
      mockAPI = {} as PackmindAPI;
      getSpacesStub = sandbox.stub();
      getSpacesStub.resolves(spaces);
      mockAPI.getSpaces = getSpacesStub;
      
      // Create the instance to test
      packmindLogic = new PackmindLogic(mockAPI);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('matches "back-end" input with "backend" space', async () => {
      // Call the method with the input 'back-end' as specified in the requirements
      const result = await packmindLogic.getActualSpace('back-end');

      // Verify the stub was called once
      expect(getSpacesStub.calledOnce).to.be.true;
      
      // Verify that the correct space is returned
      expect(result).to.deep.equal({ id: '1', name: 'backend' });
    });
    
    it('should matches "Back end" input with "backend" space', async () => {
      // Call the method with the input 'Back end' (with space and capitalization)
      const result = await packmindLogic.getActualSpace('Back end');

      // Verify the stub was called once
      expect(getSpacesStub.calledOnce).to.be.true;
      
      // Verify that the correct space is returned
      expect(result).to.deep.equal({ id: '1', name: 'backend' });
    });
  });
}); 