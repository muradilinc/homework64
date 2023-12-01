import React, {useState} from 'react';
import axiosApi from '../../axiosApi';
import {toast} from 'react-toastify';

const Contact = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    message: ''
  });

  const changeContact = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setContact((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const sendContact = async (event: React.FormEvent) => {
    event.preventDefault();

    const contactData = {
      id: Math.random(),
      name: contact.name,
      email: contact.email,
      message: contact.message
    };

    try {
      await axiosApi.post('/contact.json', contactData);
    } catch (error) {
      toast.error('Sorry, error');
    } finally {
      setContact({
        name: '',
        email: '',
        message: ''
      });
      toast.success('Sent message');
    }
  };

  return (
    <div className="text-gray-600 body-font h-screen bg-yellow-100">
      <div className="container flex flex-col md:flex-row lg:max-w-5xl w-full px-5 py-12 md:py-24 mx-auto section"
           id="contact-forhtmlm">
        <div className="md:w-1/3 w-full">
          <h1 className="text-4xl text-gray-800 sm:text-4xl font-bold title-font mb-4">Contact Us</h1>
          <p className="leading-relaxed text-xl text-gray-900">
            We're here to assist you! If you have any questions or need assistance, please feel free to
            reach out to
            us.
            <br/><br/>
            You can also email us at
            <a href="mailto:contact@example.com"
               className="font-semibold border-b-4 border-green-400">contact@example.com</a>
          </p>
        </div>
        <div className="md:w-2/3 w-full mt-10 md:mt-0 md:pl-28">
          <h1 className="text-4xl text-gray-800 sm:text-4xl font-bold title-font mb-4">Contact form</h1>
          <form onSubmit={sendContact} id="submit-contact-forhtmlm">
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="name" className="leading-7 py-4 text-lg text-gray-900">Your Name</label>
                <input
                  value={contact.name}
                  onChange={changeContact}
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out "
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="email" className="leading-7 py-4 text-lg text-gray-900">Your
                  Email</label>
                <input
                  value={contact.email}
                  onChange={changeContact}
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out "
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="message" className="leading-7 py-4 text-lg text-gray-900">Your
                  Message</label>
                <textarea
                  value={contact.message}
                  onChange={changeContact}
                  id="message"
                  name="message"
                  required
                  className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-900 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out "></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button type="submit"
                      className="flex text-white bg-gray-900 border-0 py-4 px-6 focus:outline-none hover:bg-blue-900 rounded text-xl font-bold shadow-lg mx-0 flex-col text-center g-recaptcha">
                Send Message ✉
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;