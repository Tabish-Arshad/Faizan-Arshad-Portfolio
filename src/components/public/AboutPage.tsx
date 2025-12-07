import { Award, Briefcase, Code2, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export function AboutPage() {
  const skills = [
    { name: 'SAP ABAP', level: 95 },
    { name: 'ERP Integration', level: 90 },
    { name: 'SQL/Database', level: 88 },
    { name: 'Python', level: 85 },
    { name: 'JavaScript/TypeScript', level: 82 },
    { name: 'REST APIs', level: 88 },
  ];

  const experience = [
    {
      title: 'Senior ERP Developer',
      company: 'Tech Solutions Inc.',
      period: '2020 - Present',
      description: 'Leading SAP ABAP development projects and enterprise integrations for Fortune 500 clients.',
    },
    {
      title: 'Functional ERP Developer',
      company: 'Enterprise Systems Co.',
      period: '2017 - 2020',
      description: 'Developed custom SAP modules and implemented business process optimization solutions.',
    },
    {
      title: 'Junior SAP Developer',
      company: 'Business Solutions Ltd.',
      period: '2015 - 2017',
      description: 'Started career in SAP development, focusing on ABAP programming and report generation.',
    },
  ];

  const certifications = [
    'SAP Certified Development Associate - ABAP',
    'SAP Certified Technology Associate - System Administration',
    'Oracle Database Administrator Certified Professional',
    'AWS Certified Solutions Architect',
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">About Me</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate about building robust ERP solutions and sharing knowledge with the developer community
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8 border border-gray-200">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-4 shadow-lg"
              >
                JD
              </motion.div>
              <h2 className="text-2xl text-center mb-2">John Doe</h2>
              <p className="text-center text-gray-600 mb-6">Functional ERP Developer</p>
              
              <div className="space-y-4">
                {[
                  { icon: Briefcase, text: '8+ Years Experience', color: 'from-emerald-500 to-teal-600' },
                  { icon: Code2, text: 'SAP ABAP Expert', color: 'from-blue-500 to-cyan-600' },
                  { icon: Award, text: '4 Certifications', color: 'from-purple-500 to-pink-600' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-md`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
            >
              <h3 className="text-2xl mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">My Story</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  I&apos;m a Functional ERP Developer with over 8 years of experience specializing in SAP ABAP development 
                  and enterprise system integrations. My journey in ERP development began with a fascination for how 
                  large-scale business processes can be optimized through technology.
                </p>
                <p>
                  Throughout my career, I&apos;ve worked with Fortune 500 companies to develop custom SAP modules, 
                  optimize business processes, and create seamless integrations between legacy ERP systems and modern 
                  web technologies. I believe in writing clean, maintainable code and following industry best practices.
                </p>
                <p>
                  Beyond development, I&apos;m passionate about knowledge sharing. Through this blog, I share insights, 
                  tutorials, and best practices to help fellow developers navigate the complex world of ERP development. 
                  Whether you&apos;re just starting with SAP ABAP or looking to optimize your enterprise integrations, 
                  I hope my content provides value to your journey.
                </p>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
            >
              <h3 className="text-2xl mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Technical Skills</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
            >
              <h3 className="text-2xl mb-6 flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                <Briefcase className="w-6 h-6 text-emerald-600" />
                Work Experience
              </h3>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="relative pl-8 pb-6 border-l-2 border-emerald-600 last:pb-0"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="absolute left-0 top-0 w-4 h-4 bg-emerald-600 rounded-full transform -translate-x-[9px] shadow-lg"
                    />
                    <div className="mb-1">
                      <h4 className="text-xl text-gray-900">{job.title}</h4>
                      <p className="text-emerald-600">{job.company}</p>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{job.period}</p>
                    <p className="text-gray-700">{job.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
            >
              <h3 className="text-2xl mb-6 flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                <GraduationCap className="w-6 h-6 text-emerald-600" />
                Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-start gap-3 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
                  >
                    <Award className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}