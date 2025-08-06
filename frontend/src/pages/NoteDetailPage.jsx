import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import api from '../lib/axios'
import { toast } from 'react-hot-toast'
import { Pencil, Trash, LoaderIcon, Trash2Icon, ArrowLeftIcon } from 'lucide-react'
import { Link } from 'react-router'

const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate();
  const { id } = useParams()

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`)
      toast.success('Note deleted successfully')
      navigate('/')
    } catch (error) {
      console.error('Error deleting note:', error)
      toast.error('Failed to delete note')
    }
  }
  const handleSave = async () => {
    try {
      setSaving(true)
      await api.put(`/notes/${id}`, note)
      toast.success('Note saved successfully')
    } catch (error) {
      console.error('Error saving note:', error)
      toast.error('Failed to save note')
    } finally {
      setSaving(false)
    }
  }
  useEffect(() => {
      const fetchNote = async () => {
        try {
          const response = await api.get(`/notes/${id}`)
          setNote(response.data)
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching note:', error)
          toast.error('Failed to fetch note')
        } finally {
          setLoading(false)
        }
      }
      fetchNote()
    }, [id])
    if (loading) {
      return (
        <div className='min-h-screen bg-base-200 flex items-center justify-center'>
          <LoaderIcon className='animate-spin size-10' />
        </div>
      )
    }
  return (
      <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl mx-auto'>

            <div className='flex justify-between items-center mb-6'>
              <Link to='/' className='btn btn-ghost'>
                <ArrowLeftIcon className='size-5' />
                Back to Notes
              </Link>
              <button onClick={handleDelete} className='btn btn-error'>
                <Trash2Icon className='size-5' />
                Delete Note
              </button>
            </div>

            <div className='card bg-base-100 shadow-md'>
              <div className='card-body'>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input
                    type='text'
                    value={note.title}
                    className='input input-bordered'
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                  />

                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea
                    value={note.content}
                    placeholder='Enter your note content here...'
                    className='textarea textarea-bordered h-24'
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                  />
                </div>

                <div className='card-actions justify-end'>
                  <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>

            </div>
          </div>
          
        </div>

      </div>
  )
}

export default NoteDetailPage