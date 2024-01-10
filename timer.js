//�����֐�
(function () {
    var timer = document.getElementById('timer');
    var min = document.getElementById('min');
    var sec = document.getElementById('sec');
    var reset = document.getElementById('reset');
    var start = document.getElementById('start');

    // �X�^�[�g�^�C�������������̎��Ԃ�����ϐ�
    var startTime;

    // �c�莞�Ԃ��v�Z���邽�߂̕ϐ�
    var timeLeft;

    // ���ݎ����ƕ\���`�������킹�邽�߂� * 1000
    var timeToCountDown = 0;

    // clearTimeout���\�b�h���g�������̂ŁA���̎��p�ɕϐ���`
    var timerId;

    // �J�E���g�_�E���̏�Ԃ��Ǘ��ł���悤�ɂ���
    var isRunning = false;

    // �c�莞�Ԃ�\�����邽�߂ɁA�~���b��n���ƁA����b�ɒ����Ă����֐�
    function updateTimer(t) {

        // �����Ƃ��ēn���ꂽt�Ńf�[�^�I�u�W�F�N�g����肽���̂ŕϐ�d�Ƃ����ϐ����ō���Ă݂�
        var d = new Date(t);
        var m = d.getMinutes();
        var s = d.getSeconds();
        m = ('0' + m).slice(-2);
        s = ('0' + s).slice(-2);
        timer.textContent = m + ':' + s;
        
        // �^�C�}�[���^�u�ɂ��\������
        var title = timer.textContent = m + ':' + s;;
        document.title = title;

    }


    function countDown() {

        // 10�~���b��Ɏ��s����
        timerId = setTimeout(function () {

            // �c�莞�� = �J�E���g����鎞�� - ���ݎ���
            timeLeft = timeToCountDown - (Date.now() - startTime);

            // �c�莞�Ԃ�0�ɂȂ������̏���
            if (timeLeft < 0) {
                isRunning = false;
                start.textContent = '�X�^�[�g';
                clearTimeout(timerId);
                timeLeft = 0;

                timeToCountDown = 0;

                updateTimer(timeLeft);

                return;
            }

            // countDown���ċA�I�ɌĂяo�����߂ɋL�q
            updateTimer(timeLeft)
            countDown();

        }, 10);
    }

    // �X�^�[�g���������Ƃ��̏���
    start.addEventListener('click', function () {

        if (isRunning === false) {
            isRunning = true;

            start.textContent = '�X�g�b�v';
            
            startTime = Date.now();

            // �J�E���g�_�E���̋@�\�͍ċA�I�Ɏ��s
            countDown();
        } else {
            isRunning = false;

            // �\�L��Start�ɖ߂�
            start.textContent = '�X�^�[�g';

            // ���̎��_��timeLeft�ōX�V���Ă�����
            timeToCountDown = timeLeft;

            // �J�E���g���~�߂����̂�clearTimeout����
            clearTimeout(timerId);
        }
    });

    // �������������̏���
    min.addEventListener('click', function () {

        // �J�E���g�_�E�����ɐݒ莞�Ԃ�ύX�ł��Ȃ��悤�ɂ���
        if (isRunning === true) {
            return;
        }

        // �� = 60�b�Ȃ̂�
        timeToCountDown += 60 * 1000;

        // 60���A60�b�𒴂�����0�ɂ���
        if (timeToCountDown >= 60 * 60 * 1000) {
            timeToCountDown = 0;
        }

        // timeToCountDown��timer�ɔ��f���������̂�upDatetimer���g��
        updateTimer(timeToCountDown);
    });


    // �b�����������̏���
    sec.addEventListener('click', function () {

        // �J�E���g�_�E�����ɐݒ莞�Ԃ�ύX�ł��Ȃ��悤�ɂ���
        if (isRunning === true) {
            return;
        }

        // 1�b�Ȃ̂�
        timeToCountDown += 1000;

        if (timeToCountDown >= 60 * 60 * 1000) {
            timeToCountDown = 0;
        }

        // timeToCountDown��timer�ɔ��f���������̂�upDatetimer���g��
        updateTimer(timeToCountDown);
    });


    // ���Z�b�g�����������̏���
    reset.addEventListener('click', function () {

        // �J�E���g�_�E�����ɐݒ莞�Ԃ�ύX�ł��Ȃ��悤�ɂ���
        if (isRunning === true) {
            return;
        }

        timeToCountDown = 0;

        // timeToCountDown��timer�ɔ��f���������̂�upDatetimer���g��
        updateTimer(timeToCountDown);
    });
})();