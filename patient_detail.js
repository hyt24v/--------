document.addEventListener('DOMContentLoaded', () => {
    const patientNameHeader = document.getElementById('patient-name-header');
    const patientIdSpan = document.getElementById('patient-id');
    const patientGenderSpan = document.getElementById('patient-gender');
    const patientAgeSpan = document.getElementById('patient-age');

    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    const outpatientContent = document.getElementById('outpatient-content');
    const labContent = document.getElementById('lab-content');
    const imagingContent = document.getElementById('imaging-content');
    const inpatientContent = document.getElementById('inpatient-content');

    const STORAGE_KEY = 'medicalRecordsData';

    // 从URL获取患者ID
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('id');

    // 加载所有病历数据
    function loadAllRecords() {
        const storedData = localStorage.getItem(STORAGE_KEY);
        return storedData ? JSON.parse(storedData) : [];
    }

    // 根据ID查找特定患者的数据
    function findPatient(id) {
        const records = loadAllRecords();
        return records.find(record => record.id === id);
    }

    const patientData = findPatient(patientId);

    if (patientData) {
        // 渲染患者基本信息
        patientNameHeader.textContent = patientData.name;
        patientIdSpan.textContent = patientData.id;
        patientGenderSpan.textContent = patientData.gender;
        patientAgeSpan.textContent = patientData.age;

        // 渲染各系统数据
        renderOutpatientData(patientData.outpatient || []);
        renderLabData(patientData.lab || []);
        renderImagingData(patientData.imaging || []);
        renderInpatientData(patientData.inpatient || []);
    } else {
        document.querySelector('.container').innerHTML = '<h1>未找到患者信息</h1><a href="index.html">返回列表</a>';
    }

    // Tab切换逻辑
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetTab = tab.getAttribute('data-tab');
            tabContents.forEach(content => {
                if (content.id === targetTab) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // --- 数据渲染函数 ---

    function renderOutpatientData(data) {
        if (data.length === 0) {
            outpatientContent.innerHTML = '<p>暂无门诊记录。</p>';
            return;
        }
        let html = '';
        data.forEach(item => {
            html += `
                <div class="data-section">
                    <h3>就诊日期: ${item.date}</h3>
                    <p><strong>科室:</strong> ${item.department}</p>
                    <p><strong>主诉:</strong> ${item.chiefComplaint}</p>
                    <p><strong>诊断:</strong> ${item.diagnosis}</p>
                </div>
            `;
        });
        outpatientContent.innerHTML = html;
    }

    function renderLabData(data) {
        if (data.length === 0) {
            labContent.innerHTML = '<p>暂无检验报告。</p>';
            return;
        }
        let html = '';
        data.forEach(item => {
            html += `
                <div class="data-section">
                    <h3>报告日期: ${item.date}</h3>
                    <p><strong>项目:</strong> ${item.testName}</p>
                    <p><strong>结果:</strong> ${item.result} ${item.unit}</p>
                    <p><strong>参考范围:</strong> ${item.referenceRange}</p>
                </div>
            `;
        });
        labContent.innerHTML = html;
    }

    function renderImagingData(data) {
        if (data.length === 0) {
            imagingContent.innerHTML = '<p>暂无影像学检查。</p>';
            return;
        }
        let html = '';
        data.forEach(item => {
            html += `
                <div class="data-section">
                    <h3>检查日期: ${item.date}</h3>
                    <p><strong>类型:</strong> ${item.type}</p>
                    <p><strong>部位:</strong> ${item.bodyPart}</p>
                    <p><strong>影像所见:</strong> ${item.findings}</p>
                    <p><strong>诊断意见:</strong> ${item.conclusion}</p>
                </div>
            `;
        });
        imagingContent.innerHTML = html;
    }

    function renderInpatientData(data) {
        if (data.length === 0) {
            inpatientContent.innerHTML = '<p>暂无住院病历。</p>';
            return;
        }
        let html = '';
        data.forEach(item => {
            html += `
                <div class="data-section">
                    <h3>入院日期: ${item.admissionDate} | 出院日期: ${item.dischargeDate}</h3>
                    <p><strong>主诊断:</strong> ${item.primaryDiagnosis}</p>
                    <p><strong>入院记录:</strong> ${item.admissionRecord}</p>
                    <p><strong>出院小结:</strong> ${item.dischargeSummary}</p>
                </div>
            `;
        });
        inpatientContent.innerHTML = html;
    }
});
