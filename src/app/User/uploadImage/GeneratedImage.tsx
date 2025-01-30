// 'use client';

// import { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Textarea } from '@/components/ui/textarea';

// interface FormData {
//   pipeType: string;
//   pipeSize: string;
//   instrumentType: string;
//   instrumentLocation: string;
//   notes: string;
// }

// export default function PipesInstrumentsForm() {
//   const [formData, setFormData] = useState<FormData>({
//     pipeType: '',
//     pipeSize: '',
//     instrumentType: '',
//     instrumentLocation: '',
//     notes: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/process-data', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) throw new Error('Failed to send data');
//       alert('Data sent successfully!');
//     } catch (error) {
//       console.error('Submission error:', error);
//       alert('Error submitting form');
//     }
//   };

//   return (
//     <Card className="max-w-4xl mx-auto mt-10 p-8 shadow-lg rounded-lg">
//       <CardHeader>
//         <CardTitle>Pipe & Instrument Input</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
//           <Input
//             name="pipeType"
//             value={formData.pipeType}
//             onChange={handleChange}
//             placeholder="Pipe Type"
//             required
//             className="w-full"
//           />
//           <Input
//             name="pipeSize"
//             value={formData.pipeSize}
//             onChange={handleChange}
//             placeholder="Pipe Size"
//             required
//             className="w-full"
//           />
//           <Input
//             name="instrumentType"
//             value={formData.instrumentType}
//             onChange={handleChange}
//             placeholder="Instrument Type"
//             required
//             className="w-full"
//           />
//           <Input
//             name="instrumentLocation"
//             value={formData.instrumentLocation}
//             onChange={handleChange}
//             placeholder="Instrument Location"
//             required
//             className="w-full"
//           />
//           <Textarea
//             name="notes"
//             value={formData.notes}
//             onChange={handleChange}
//             placeholder="Additional Notes"
//             className="col-span-2"
//           />
//           <div className="col-span-2 flex justify-center">
//             <Button type="submit" className="w-1/2">Submit</Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
