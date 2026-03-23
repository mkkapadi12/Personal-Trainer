import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentSchema } from './appointmentSchema';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { createAppointmentAsync } from '@/Store/features/appointment/appointment.slice';

export default function AppointmentForm() {
  const [step, setStep] = useState(1);
  const { loading, error, appointment } = useSelector(
    (state) => state.appointment,
  );
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      service: '',
      duration: '',
      note: '',
      date: '',
      time: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  const onSubmit = async (data) => {
    try {
      toast.loading('Creating appointment...');

      const result = await dispatch(createAppointmentAsync(data)).unwrap();

      toast.dismiss();
      toast.success(result.msg || 'Appointment created successfully!');
      form.reset();
      setStep(1);
    } catch (error) {
      toast.dismiss();
      toast.error(error || 'Appointment failed');
    }
  };

  console.log('Appointments : ', appointment);

  return (
    <section className="bg-black text-white">
      <div className="md:max-w-4xl w-full max-w-full mx-auto md:px-6">
        {/* Progress */}
        <div className="flex gap-4 mb-10">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-3 w-3 rounded-full ${
                step >= s ? 'bg-lime-400' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 md:space-y-8"
          >
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <div>
                  <h1>Start</h1>
                  <h2 className="text-2xl md:text-4xl font-bold">
                    GET A APPOINTMENT NOW
                  </h2>
                </div>

                <p className="max-w-xl text-sm ">
                  A trainer is an individual who specialises in imparting
                  knowledge, providing guidance, and facilitating learning in a
                  specific field or subject.
                </p>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service:</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full bg-black border p-4 border-gray-600"
                          >
                            <option value="+$15.00">
                              First option (+$15.00)
                            </option>
                            <option value="+$34.00">
                              Second option (+$34.00)
                            </option>
                            <option value="+$155.00">
                              Third option (+$155.00)
                            </option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additionals informations:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Add Text"
                            {...field}
                            className="bg-black border-gray-600 rounded-none"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration:</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full bg-black border p-4 border-gray-600"
                          >
                            <option value="">Duration</option>
                            <option value="30">30 min</option>
                            <option value="60">60 min</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="button" onClick={next} variant="primary">
                    NEXT STEP →
                  </Button>
                </div>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <div>
                  <h1>Step {step}</h1>
                  <h2 className="text-2xl md:text-4xl font-bold">
                    SELECT DATE AND HOUR
                  </h2>
                </div>

                <p>
                  Trainers design and develop training programs, courses, or
                  materials that align with the learning objectives and the
                  needs of their target audience.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date:</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="rounded-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery hour:</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            {...field}
                            className="rounded-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="primary" onClick={prev}>
                    ← PREVIOUS STEP
                  </Button>

                  <Button type="button" variant="primary" onClick={next}>
                    NEXT STEP →
                  </Button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <div>
                  <h1>Finish</h1>
                  <h2 className="text-4xl font-bold">TYPE YOUR DATA</h2>
                </div>

                <p>
                  Trainers assess the progress and performance of their learners
                  through tests, assignments, projects, or other evaluation
                  methods. They provide feedback and guidance to help learners
                  improve their skills and knowledge.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="First name"
                            {...field}
                            className="rounded-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Last name"
                            {...field}
                            className="rounded-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            {...field}
                            className="rounded-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Phone number"
                            {...field}
                            className="rounded-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additionals informations:</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How Can We Help?"
                          rows={5}
                          {...field}
                          className="rounded-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex flex-wrap gap-4 items-center justify-center md:items-start md:justify-start">
                  <Button type="button" variant="primary" onClick={prev}>
                    ← PREVIOUS STEP
                  </Button>

                  <Button type="submit" variant="primary">
                    MAKE AN APPOINTMENT →
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
}
