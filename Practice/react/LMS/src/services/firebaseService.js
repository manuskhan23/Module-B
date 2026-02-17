import { ref, get, set, push, remove, query, orderByChild, equalTo, limitToFirst, startAt, endAt } from 'firebase/database';
import { database } from '../firebase/config';

class FirebaseService {
  constructor() {
    this.database = database;
  }

  async create(collection, data) {
    try {
      const newRef = push(ref(this.database, collection));
      await set(newRef, {
        ...data,
        id: newRef.key,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return { id: newRef.key, ...data };
    } catch (error) {
      console.error(`Error creating ${collection}:`, error);
      throw error;
    }
  }

  async getById(collection, id) {
    try {
      const snapshot = await get(ref(this.database, `${collection}/${id}`));
      if (snapshot.exists()) {
        return { id: snapshot.key, ...snapshot.val() };
      }
      return null;
    } catch (error) {
      console.error(`Error getting ${collection} by id:`, error);
      throw error;
    }
  }

  async getAll(collection, options = {}) {
    try {
      let dbRef = ref(this.database, collection);
      
      if (options.orderBy) {
        dbRef = query(dbRef, orderByChild(options.orderBy));
      }
      
      if (options.limit) {
        dbRef = query(dbRef, limitToFirst(options.limit));
      }
      
      if (options.startAt) {
        dbRef = query(dbRef, startAt(options.startAt));
      }
      
      if (options.endAt) {
        dbRef = query(dbRef, endAt(options.endAt));
      }
      
      const snapshot = await get(dbRef);
      const data = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          data.push({ id: child.key, ...child.val() });
        });
      }
      
      if (options.orderDirection === 'desc') {
        data.reverse();
      }
      
      if (options.filter) {
        data = data.filter(item => {
          return Object.keys(options.filter).every(key => 
            item[key] === options.filter[key]
          );
        });
      }
      
      if (options.limit && !options.orderBy) {
        data = data.slice(0, options.limit);
      }
      
      return data;
    } catch (error) {
      console.error(`Error getting all ${collection}:`, error);
      throw error;
    }
  }

  async update(collection, id, data) {
    try {
      const itemRef = ref(this.database, `${collection}/${id}`);
      await set(itemRef, {
        ...data,
        id: id,
        updatedAt: new Date().toISOString()
      });
      return { id, ...data };
    } catch (error) {
      console.error(`Error updating ${collection}:`, error);
      throw error;
    }
  }

  async delete(collection, id) {
    try {
      await remove(ref(this.database, `${collection}/${id}`));
      return true;
    } catch (error) {
      console.error(`Error deleting ${collection}:`, error);
      throw error;
    }
  }

  async getStudentsByUserId(userId, options = {}) {
    try {
      const studentsRef = ref(this.database, `users/${userId}/students`);
      const snapshot = await get(studentsRef);
      const students = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          students.push({ id: child.key, ...child.val() });
        });
      }
      
      if (options.search) {
        const searchTerm = options.search.toLowerCase();
        students = students.filter(student => 
          student.name.toLowerCase().includes(searchTerm) ||
          student.email.toLowerCase().includes(searchTerm)
        );
      }
      
      return students;
    } catch (error) {
      console.error('Error getting students:', error);
      throw error;
    }
  }

  async getTeachersByUserId(userId, options = {}) {
    try {
      const teachersRef = ref(this.database, `users/${userId}/teachers`);
      const snapshot = await get(teachersRef);
      const teachers = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          teachers.push({ id: child.key, ...child.val() });
        });
      }
      
      if (options.search) {
        const searchTerm = options.search.toLowerCase();
        teachers = teachers.filter(teacher => 
          teacher.name.toLowerCase().includes(searchTerm) ||
          teacher.email.toLowerCase().includes(searchTerm)
        );
      }
      
      return teachers;
    } catch (error) {
      console.error('Error getting teachers:', error);
      throw error;
    }
  }

  async getClassesByUserId(userId, options = {}) {
    try {
      const classesRef = ref(this.database, `users/${userId}/classes`);
      const snapshot = await get(classesRef);
      const classes = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          classes.push({ id: child.key, ...child.val() });
        });
      }
      
      if (options.search) {
        const searchTerm = options.search.toLowerCase();
        classes = classes.filter(cls => 
          cls.name.toLowerCase().includes(searchTerm) ||
          cls.grade.toLowerCase().includes(searchTerm)
        );
      }
      
      return classes;
    } catch (error) {
      console.error('Error getting classes:', error);
      throw error;
    }
  }

  async getSubjectsByUserId(userId, options = {}) {
    try {
      const subjectsRef = ref(this.database, `users/${userId}/subjects`);
      const snapshot = await get(subjectsRef);
      const subjects = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          subjects.push({ id: child.key, ...child.val() });
        });
      }
      
      if (options.search) {
        const searchTerm = options.search.toLowerCase();
        subjects = subjects.filter(subject => 
          subject.name.toLowerCase().includes(searchTerm) ||
          subject.code.toLowerCase().includes(searchTerm)
        );
      }
      
      return subjects;
    } catch (error) {
      console.error('Error getting subjects:', error);
      throw error;
    }
  }

  async getSyllabusByUserId(userId, options = {}) {
    try {
      const syllabusRef = ref(this.database, `users/${userId}/syllabus`);
      const snapshot = await get(syllabusRef);
      const syllabus = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          syllabus.push({ id: child.key, ...child.val() });
        });
      }
      
      if (options.search) {
        const searchTerm = options.search.toLowerCase();
        syllabus = syllabus.filter(syl => 
          syl.subject.toLowerCase().includes(searchTerm) ||
          syl.grade.toLowerCase().includes(searchTerm)
        );
      }
      
      return syllabus;
    } catch (error) {
      console.error('Error getting syllabus:', error);
      throw error;
    }
  }

  async getFeesByUserId(userId, options = {}) {
    try {
      const feesRef = ref(this.database, `users/${userId}/fees`);
      const snapshot = await get(feesRef);
      const fees = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          fees.push({ id: child.key, ...child.val() });
        });
      }
      
      if (options.search) {
        const searchTerm = options.search.toLowerCase();
        fees = fees.filter(fee => 
          fee.student.toLowerCase().includes(searchTerm) ||
          fee.type.toLowerCase().includes(searchTerm)
        );
      }
      
      return fees;
    } catch (error) {
      console.error('Error getting fees:', error);
      throw error;
    }
  }

  async getAdmissionsByUserId(userId, options = {}) {
    try {
      const admissionsRef = ref(this.database, `users/${userId}/admissions`);
      const snapshot = await get(admissionsRef);
      const admissions = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          admissions.push({ id: child.key, ...child.val() });
        });
      }
      
      if (options.search) {
        const searchTerm = options.search.toLowerCase();
        admissions = admissions.filter(admission => 
          admission.studentName.toLowerCase().includes(searchTerm) ||
          admission.status.toLowerCase().includes(searchTerm)
        );
      }
      
      return admissions;
    } catch (error) {
      console.error('Error getting admissions:', error);
      throw error;
    }
  }

  async getExamsByUserId(userId, options = {}) {
    try {
      const examsRef = ref(this.database, `users/${userId}/exams`);
      const snapshot = await get(examsRef);
      const exams = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          exams.push({ id: child.key, ...child.val() });
        });
      }
      
      if (options.search) {
        const searchTerm = options.search.toLowerCase();
        exams = exams.filter(exam => 
          exam.name.toLowerCase().includes(searchTerm) ||
          exam.subject.toLowerCase().includes(searchTerm)
        );
      }
      
      return exams;
    } catch (error) {
      console.error('Error getting exams:', error);
      throw error;
    }
  }

  async getSchoolInfoByUserId(userId) {
    try {
      const schoolRef = ref(this.database, `users/${userId}/school`);
      const snapshot = await get(schoolRef);
      
      if (snapshot.exists()) {
        return { id: snapshot.key, ...snapshot.val() };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting school info:', error);
      throw error;
    }
  }

  async getDashboardStats(userId) {
    try {
      const [students, teachers, classes, subjects, syllabus, fees] = await Promise.all([
        this.getStudentsByUserId(userId),
        this.getTeachersByUserId(userId),
        this.getClassesByUserId(userId),
        this.getSubjectsByUserId(userId),
        this.getSyllabusByUserId(userId),
        this.getFeesByUserId(userId)
      ]);

      return {
        totalStudents: students.length,
        totalTeachers: teachers.length,
        totalClasses: classes.length,
        totalSubjects: subjects.length,
        totalSyllabus: syllabus.length,
        totalFees: fees.length,
        recentStudents: students.slice(-5),
        recentTeachers: teachers.slice(-5),
        recentClasses: classes.slice(-5)
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      throw error;
    }
  }

  async searchAcrossCollections(userId, searchTerm, collections = ['students', 'teachers', 'classes', 'subjects']) {
    try {
      const results = {};
      
      for (const collection of collections) {
        try {
          const data = await this[`get${collection.charAt(0).toUpperCase() + collection.slice(1)}ByUserId`](userId, { search: searchTerm });
          results[collection] = data;
        } catch (error) {
          console.error(`Error searching ${collection}:`, error);
          results[collection] = [];
        }
      }
      
      return results;
    } catch (error) {
      console.error('Error searching across collections:', error);
      throw error;
    }
  }
}

export default new FirebaseService();
