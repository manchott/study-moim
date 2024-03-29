package com.ssafy.peace.service;

import com.ssafy.peace.dto.CourseDto;
import com.ssafy.peace.dto.LectureDto;
import com.ssafy.peace.dto.NoteDto;
import com.ssafy.peace.entity.Course;
import com.ssafy.peace.entity.Lecture;
import com.ssafy.peace.entity.Note;
import com.ssafy.peace.repository.LectureRepository;
import com.ssafy.peace.repository.NoteRepository;
import com.ssafy.peace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;

    @Transactional(readOnly = true)
    public NoteDto getNoteDetail(int lectureId, int userId) {
        List<Note> result = noteRepository.findAllByUser_userIdAndLecture_lectureId(userId, lectureId);
        if(result.size()==0)    return null;
        return NoteDto.fromEntity(result.get(0));
    }

    @Transactional
    public void noteWriteOrUpdate(NoteDto noteDto) {
        List<Note> result = noteRepository.findAllByUser_userIdAndLecture_lectureId(noteDto.getUserId(), noteDto.getLectureId());
        if(result.size()==0) {
            // 등록
            noteRepository.save(Note.builder()
                    .content(noteDto.getContent())
                    .user(userRepository.findByUserId(noteDto.getUserId()))
                    .lecture(lectureRepository.findById(noteDto.getLectureId()).get())
                    .build());
        } else {
            // 수정
            noteRepository.save(Note.builder()
                    .content(noteDto.getContent())
                    .user(userRepository.findByUserId(noteDto.getUserId()))
                    .lecture(lectureRepository.findById(noteDto.getLectureId()).get())
                    .build().updateId(result.get(0).getNoteId()));
        }
    }


    @Transactional(readOnly = true)
    public List<CourseDto.Info> getCourseListExistNote(int userId) {
        return noteRepository.findAllCourseListExistNote(userId).stream()
                .map(CourseDto.Info::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<LectureDto.Info> getLectureListExistNote(int userId, int courseId) {
        return noteRepository.findAllLectureListExistNote(userId, courseId).stream()
                .map(LectureDto.Info::fromEntity)
                .collect(Collectors.toList());
    }
}
