import Modal from '..';

const { confirm } = Modal;

describe('Modal.confirm triggers callbacks correctly', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
    document.body.innerHTML = '';
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  function $$(className) {
    return document.body.querySelectorAll(className);
  }

  function open(args) {
    confirm({
      title: 'Want to delete these items?',
      content: 'some descriptions',
      ...args,
    });
  }

  it('trigger onCancel once when click on cancel button', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();
    open({
      onCancel,
      onOk,
    });
    // first Modal
    $$('.wmstool-btn')[0].click();
    expect(onCancel.mock.calls.length).toBe(1);
    expect(onOk.mock.calls.length).toBe(0);
  });

  it('trigger onOk once when click on ok button', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();
    open({
      onCancel,
      onOk,
    });
    // second Modal
    $$('.wmstool-btn-primary')[0].click();
    expect(onCancel.mock.calls.length).toBe(0);
    expect(onOk.mock.calls.length).toBe(1);
  });

  it('should allow Modal.comfirm without onCancel been set', () => {
    open();
    // Third Modal
    $$('.wmstool-btn')[0].click();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should allow Modal.comfirm without onOk been set', () => {
    open();
    // Fourth Modal
    $$('.wmstool-btn-primary')[0].click();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  if (process.env.REACT !== '15') {
    it('shows animation when close', () => {
      jest.useFakeTimers();
      open();
      $$('.wmstool-btn')[0].click();
      expect($$('.wmstool-confirm')).toHaveLength(1);
      jest.runAllTimers();
      expect($$('.wmstool-confirm')).toHaveLength(0);
      jest.useRealTimers();
    });
  }

  it('ok only', () => {
    open({ okCancel: false });
    expect($$('.wmstool-btn')).toHaveLength(1);
    expect($$('.wmstool-btn')[0].innerHTML).toContain('OK');
  });
});
