document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'medicalRecordsData';

    // 从localStorage加载数据或使用默认数据
    function loadRecords() {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            return JSON.parse(storedData);
        } else {
            // 生成10个患者的详细数据
            return [
                {
                    id: 'MR001', name: '张三', gender: '男', age: 45, department: '心内科',
                    outpatient: [{ date: '2023-10-10', department: '心内科', chiefComplaint: '胸闷、气短', diagnosis: '冠心病' }],
                    lab: [{ date: '2023-10-10', testName: '血常规', result: '正常', unit: '', referenceRange: '' }],
                    imaging: [{ date: '2023-10-11', type: 'X光', bodyPart: '胸部', findings: '心影增大', conclusion: '符合冠心病改变' }],
                    inpatient: []
                },
                {
                    id: 'MR002', name: '李四', gender: '女', age: 32, department: '呼吸科',
                    outpatient: [{ date: '2023-11-01', department: '呼吸科', chiefComplaint: '持续咳嗽', diagnosis: '支气管炎' }],
                    lab: [],
                    imaging: [{ date: '2023-11-01', type: 'CT', bodyPart: '胸部', findings: '支气管壁增厚', conclusion: '支气管炎' }],
                    inpatient: []
                },
                {
                    id: 'MR003', name: '王五', gender: '男', age: 68, department: '神经科',
                    outpatient: [{ date: '2023-09-15', department: '神经科', chiefComplaint: '突发性头痛', diagnosis: '偏头痛' }],
                    lab: [],
                    imaging: [],
                    inpatient: []
                },
                {
                    id: 'MR004', name: '赵六', gender: '男', age: 55, department: '骨科',
                    outpatient: [{ date: '2023-08-20', department: '骨科', chiefComplaint: '右膝关节疼痛', diagnosis: '关节炎' }],
                    lab: [],
                    imaging: [{ date: '2023-08-20', type: 'MRI', bodyPart: '右膝', findings: '关节腔积液', conclusion: '退行性关节炎' }],
                    inpatient: []
                },
                {
                    id: 'MR005', name: '孙七', gender: '女', age: 28, department: '妇产科',
                    outpatient: [{ date: '2023-12-01', department: '妇产科', chiefComplaint: '常规产检', diagnosis: '孕32周' }],
                    lab: [{ date: '2023-12-01', testName: '唐氏筛查', result: '低风险', unit: '', referenceRange: '' }],
                    imaging: [{ date: '2023-12-01', type: 'B超', bodyPart: '腹部', findings: '胎儿发育正常', conclusion: '单胎活胎' }],
                    inpatient: []
                },
                {
                    id: 'MR006', name: '周八', gender: '男', age: 42, department: '眼科',
                    outpatient: [{ date: '2023-07-18', department: '眼科', chiefComplaint: '视力下降', diagnosis: '白内障' }],
                    lab: [],
                    imaging: [],
                    inpatient: [{ admissionDate: '2023-07-20', dischargeDate: '2023-07-22', primaryDiagnosis: '白内障', admissionRecord: '准备手术', dischargeSummary: '手术成功，视力恢复' }]
                },
                {
                    id: 'MR007', name: '吴九', gender: '女', age: 50, department: '内分泌科',
                    outpatient: [{ date: '2023-06-10', department: '内分泌科', chiefComplaint: '多饮、多尿', diagnosis: '2型糖尿病' }],
                    lab: [{ date: '2023-06-10', testName: '空腹血糖', result: '8.5', unit: 'mmol/L', referenceRange: '3.9-6.1' }],
                    imaging: [],
                    inpatient: []
                },
                {
                    id: 'MR008', name: '郑十', gender: '男', age: 60, department: '泌尿外科',
                    outpatient: [{ date: '2023-05-05', department: '泌尿外科', chiefComplaint: '尿频、尿急', diagnosis: '前列腺增生' }],
                    lab: [],
                    imaging: [{ date: '2023-05-05', type: 'B超', bodyPart: '前列腺', findings: '前列腺体积增大', conclusion: '前列腺增生' }],
                    inpatient: []
                },
                {
                    id: 'MR009', name: '陈十一', gender: '女', age: 35, department: '皮肤科',
                    outpatient: [{ date: '2023-04-12', department: '皮肤科', chiefComplaint: '皮肤瘙痒、红疹', diagnosis: '湿疹' }],
                    lab: [],
                    imaging: [],
                    inpatient: []
                },
                {
                    id: 'MR010', name: '魏十二', gender: '男', age: 72, department: '肿瘤科',
                    outpatient: [],
                    lab: [],
                    imaging: [],
                    inpatient: [{ admissionDate: '2023-03-01', dischargeDate: '2023-03-15', primaryDiagnosis: '肺癌', admissionRecord: '化疗治疗', dischargeSummary: '病情稳定' }]
                },
                {
                    id: 'MR011', name: '王芳', gender: '女', age: 48, department: '消化内科',
                    outpatient: [{ date: '2024-01-15', department: '消化内科', chiefComplaint: '上腹部疼痛，伴有恶心', diagnosis: '慢性胃炎' }],
                    lab: [{ date: '2024-01-15', testName: '幽门螺杆菌检测', result: '阳性', unit: '', referenceRange: '阴性' }],
                    imaging: [],
                    inpatient: []
                },
                {
                    id: 'MR012', name: '李强', gender: '男', age: 58, department: '心血管外科',
                    outpatient: [{ date: '2024-02-20', department: '心血管外科', chiefComplaint: '主动脉夹层术后复查', diagnosis: '恢复良好' }],
                    lab: [],
                    imaging: [{ date: '2024-02-20', type: 'CT血管造影', bodyPart: '胸主动脉', findings: '未见异常', conclusion: '术后改变' }],
                    inpatient: []
                },
                {
                    id: 'MR013', name: '刘敏', gender: '女', age: 31, department: '风湿免疫科',
                    outpatient: [{ date: '2024-03-10', department: '风湿免疫科', chiefComplaint: '关节肿痛，晨僵明显', diagnosis: '类风湿关节炎' }],
                    lab: [{ date: '2024-03-10', testName: '类风湿因子(RF)', result: '125', unit: 'IU/mL', referenceRange: '< 20' }],
                    imaging: [],
                    inpatient: []
                },
                {
                    id: 'MR014', name: '杨帆', gender: '男', age: 25, department: '运动医学科',
                    outpatient: [{ date: '2024-04-05', department: '运动医学科', chiefComplaint: '左踝关节扭伤', diagnosis: '韧带损伤' }],
                    lab: [],
                    imaging: [{ date: '2024-04-05', type: 'MRI', bodyPart: '左踝', findings: '距腓前韧带撕裂', conclusion: '韧带损伤' }],
                    inpatient: []
                },
                {
                    id: 'MR015', name: '黄磊', gender: '男', age: 65, department: '呼吸与危重症医学科',
                    outpatient: [],
                    lab: [],
                    imaging: [],
                    inpatient: [{ admissionDate: '2024-05-01', dischargeDate: '2024-05-10', primaryDiagnosis: '慢性阻塞性肺疾病急性加重', admissionRecord: '抗感染、平喘治疗', dischargeSummary: '症状好转出院' }]
                }
            ];
        }
    }

    // 保存数据到localStorage
    function saveRecords() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(medicalRecords));
    }

    let medicalRecords = loadRecords();

    const tableBody = document.getElementById('records-table-body');
    const searchInput = document.getElementById('search-input');
    const importBtn = document.getElementById('import-btn');
    const fileInput = document.getElementById('file-input');
    /**
     * 渲染病历数据到表格
     * @param {Array} records - 要渲染的病历数组
     */
    function renderTable(records) {
        tableBody.innerHTML = ''; // 清空现有内容

        if (records.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">暂无数据</td></tr>';
            return;
        }

        records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.id}</td>
                <td>${record.name}</td>
                <td>${record.gender}</td>
                <td>${record.age}</td>
                <td>${record.department}</td>
                <td><button class="view-btn" data-id="${record.id}">查看/批注</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // 初始化渲染
    renderTable(medicalRecords);

    // --- 事件监听 ---

    // 搜索功能
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (!searchTerm) {
            renderTable(medicalRecords);
            return;
        }
        const filteredRecords = medicalRecords.filter(record =>
            record.name.toLowerCase().includes(searchTerm) ||
            record.id.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredRecords);
    });

    // 导入按钮点击事件
    importBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (!file) {
            alert('请先选择一个CSV文件');
            return;
        }

        Papa.parse(file, {
            header: true,
            complete: function(results) {
                const newRecords = results.data.map(row => ({
                    id: row.id || `MR${Date.now()}`, // 如果没有ID，生成一个
                    name: row.name || '',
                    gender: row.gender || '',
                    age: row.age || '',
                    department: row.department || '',
                    details: row.details || '',
                    annotations: [] // 新导入的记录没有批注
                })).filter(record => record.id && record.name); // 过滤掉无效数据

                medicalRecords = medicalRecords.concat(newRecords);
                saveRecords(); // 保存导入的新数据
                renderTable(medicalRecords);
                alert(`${newRecords.length} 条记录导入成功!`);
            },
            error: function(error) {
                alert('文件解析失败:', error.message);
            }
        });
    });

    // "查看详情"按钮功能 (使用事件委托)
    tableBody.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('view-btn')) {
            const recordId = e.target.getAttribute('data-id');
            // 跳转到详情页，并传递患者ID
            window.location.href = `patient_detail.html?id=${recordId}`;
        }
    });
});
